<?php

namespace App\Repositories;

use App\Interfaces\ClassRepositoryInterface;
use Illuminate\Support\Facades\DB;

class EloquentClassRepository extends BaseRepository implements ClassRepositoryInterface
{
    public function __construct()
    {
        // Vì chưa có Model Class nên tôi sẽ tạm dùng DB table, 
        // nhưng lý tưởng nhất là bro nên tạo Model Class kế thừa Eloquent
        parent::__construct(new \App\Models\User()); // Dummy model for parent
    }

    public function getAllWithDetails()
    {
        return DB::table('classes')
            ->leftJoin('users', 'classes.teacher_id', '=', 'users.id')
            ->select(
                'classes.*',
                'users.name as teacher_name',
                DB::raw('(SELECT COUNT(*) FROM class_students WHERE class_students.class_id = classes.id) as student_count')
            )
            ->get();
    }

    public function create(array $data)
    {
        $id = \Illuminate\Support\Str::uuid()->toString();
        DB::table('classes')->insert(array_merge($data, [
            'id' => $id,
            'created_at' => now(),
            'updated_at' => now()
        ]));
        return (object)['id' => $id];
    }

    public function update($id, array $data)
    {
        DB::table('classes')->where('id', $id)->update(array_merge($data, [
            'updated_at' => now()
        ]));
        return true;
    }

    public function deleteWithStudents($id)
    {
        return DB::transaction(function () use ($id) {
            DB::table('class_students')->where('class_id', $id)->delete();
            return DB::table('classes')->where('id', $id)->delete();
        });
    }

    public function find($id)
    {
        return DB::table('classes')->where('id', $id)->first();
    }
}
