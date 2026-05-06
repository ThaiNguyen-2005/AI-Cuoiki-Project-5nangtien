<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;
use App\Models\Chapter;
use App\Models\Lesson;

class AcademicController extends Controller
{
    // ==========================================
    // MÔN HỌC (SUBJECTS)
    // ==========================================
    public function getSubjects(Request $request)
    {
        $grade = $request->query('grade');
        $subjects = Subject::all()->map(function($s) use ($grade) {
            $query = $s->chapters();
            if ($grade) {
                $query->where('grade', (string)$grade);
            }
            $s->chapters_count = $query->count();
            return $s;
        });
        return response()->json($subjects);
    }

    public function addSubject(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);
        $subject = Subject::create($data);
        return response()->json($subject, 201);
    }

    public function updateSubject(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);
        $subject->update($data);
        return response()->json($subject);
    }

    public function deleteSubject($id)
    {
        $subject = Subject::findOrFail($id);
        // Có thể thêm check nếu có chương thì không cho xoá hoặc xoá cascade
        $subject->delete();
        return response()->json(['message' => 'Đã xoá môn học']);
    }

    // ==========================================
    // CHƯƠNG HỌC (CHAPTERS)
    // ==========================================
    public function getChapters(Request $request, $subjectId = null)
    {
        $subjectId = $subjectId ?? $request->query('subject_id');
        $grade = $request->query('grade');

        $query = Chapter::query();
        
        if ($subjectId) {
            $query->where('subject_id', (string)$subjectId);
        }
        
        if ($grade) {
            $query->where('grade', (string)$grade);
        }

        $chapters = $query->withCount('lessons')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($chapters);
    }

    public function addChapter(Request $request)
    {
        $data = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'name' => 'required|string|max:255',
            'grade' => 'required|string',
        ]);
        $chapter = Chapter::create($data);
        return response()->json($chapter, 201);
    }

    public function updateChapter(Request $request, $id)
    {
        $chapter = Chapter::findOrFail($id);
        $data = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'name' => 'required|string|max:255',
            'grade' => 'required|string',
        ]);
        $chapter->update($data);
        return response()->json($chapter);
    }

    public function deleteChapter($id)
    {
        $chapter = Chapter::findOrFail($id);
        $chapter->delete();
        return response()->json(['message' => 'Đã xoá chương học']);
    }

    // ==========================================
    // BÀI HỌC (LESSONS)
    // ==========================================
    public function getLessons(Request $request, $chapterId = null)
    {
        $chapterId = $chapterId ?? $request->query('chapter_id');
        $lessons = Lesson::when($chapterId, fn($q) => $q->where('chapter_id', $chapterId))
            ->orderBy('created_at', 'asc')
            ->get();
        return response()->json($lessons);
    }

    public function addLesson(Request $request)
    {
        $data = $request->validate([
            'chapter_id' => 'required|exists:chapters,id',
            'name' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);
        $lesson = Lesson::create($data);
        return response()->json($lesson, 201);
    }

    public function updateLesson(Request $request, $id)
    {
        $lesson = Lesson::findOrFail($id);
        $data = $request->validate([
            'chapter_id' => 'required|exists:chapters,id',
            'name' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);
        $lesson->update($data);
        return response()->json($lesson);
    }

    public function deleteLesson($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();
        return response()->json(['message' => 'Đã xoá bài học']);
    }

    // API cho bộ lọc của Giáo viên
    public function getAcademicStructure()
    {
        $subjects = Subject::with(['chapters.lessons'])->get();
        return response()->json($subjects);
    }
}
