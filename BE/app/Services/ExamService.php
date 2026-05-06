<?php

namespace App\Services;

use App\Interfaces\QuizAttemptRepositoryInterface;
use App\Interfaces\QuizRepositoryInterface;
use App\Models\QuizQuestion;
use Illuminate\Support\Facades\DB;

class ExamService extends BaseService
{
    protected $quizRepository;

    public function __construct(
        QuizAttemptRepositoryInterface $repository,
        QuizRepositoryInterface $quizRepository
    ) {
        parent::__construct($repository);
        $this->quizRepository = $quizRepository;
    }

    public function getExamData($quizId, $userId)
    {
        $settings = DB::table('settings')->pluck('value', 'key');
        $globalMaxAttempts = (int)($settings['max_attempts'] ?? 3);

        $attemptCount = $this->repository->getAttemptsByQuiz($quizId, $userId)->count();

        if ($attemptCount >= $globalMaxAttempts) {
            throw new \Exception("Bạn đã hết lượt làm bài cho Quiz này (Tối đa {$globalMaxAttempts} lần).", 403);
        }

        $quiz = $this->quizRepository->findWithQuestions($quizId);

        $questions = $quiz->questions->map(fn($q) => [
            'id'      => $q->id,
            'content' => $q->content,
            'options' => is_string($q->options) ? json_decode($q->options, true) : $q->options,
        ]);

        return [
            'quiz' => [
                'id'           => $quiz->id,
                'title'        => $quiz->title,
                'time_limit'   => $quiz->time_limit ?? 30,
                'teacher_name' => $quiz->teacher->name ?? 'Không rõ',
            ],
            'questions' => $questions,
        ];
    }

    public function submitExam($quizId, $userId, array $answers, $timeSpent)
    {
        return DB::transaction(function () use ($quizId, $userId, $answers, $timeSpent) {
            $quiz = $this->quizRepository->find($quizId);
            $settings = DB::table('settings')->pluck('value', 'key');
            $globalMaxAttempts = (int)($settings['max_attempts'] ?? 3);
            $globalPassingScore = (int)($settings['passing_score'] ?? 50);

            $attemptCount = $this->repository->getAttemptsByQuiz($quizId, $userId)->count();
            if ($attemptCount >= $globalMaxAttempts) {
                throw new \Exception("Hết lượt làm bài.", 403);
            }

            $questions = QuizQuestion::where('quiz_id', $quizId)->get();
            $total     = $questions->count();
            $correct   = 0;
            $details   = [];

            foreach ($questions as $q) {
                $studentAnswer = $answers[(string)$q->id] ?? null;
                $isCorrect     = $studentAnswer !== null && (int)$studentAnswer === (int)$q->correct_index;
                if ($isCorrect) $correct++;

                $details[] = [
                    'question_id'   => $q->id,
                    'question_text' => $q->content,
                    'options'       => is_string($q->options) ? json_decode($q->options, true) : $q->options,
                    'is_correct'    => $isCorrect,
                    'student_answer'=> $studentAnswer,
                    'correct_index' => $q->correct_index,
                    'explanation'   => $q->explanation ?? '',
                ];
            }

            $percentage = $total > 0 ? round($correct / $total * 100) : 0;
            $passed = $percentage >= ($quiz->passing_score ?? $globalPassingScore);

            $attempt = $this->repository->create([
                'student_id'         => $userId,
                'quiz_id'            => $quizId,
                'score'              => $percentage,
                'correct'            => $correct,
                'total'              => $total,
                'passed'             => $passed,
                'time_spent'         => $timeSpent,
                'answers'            => $answers,
                'questions_snapshot' => $questions->map(fn($q) => [
                    'id'            => $q->id,
                    'content'       => $q->content,
                    'options'       => $q->options,
                    'correct_index' => $q->correct_index,
                    'explanation'   => $q->explanation ?? '',
                ]),
            ]);

            return [
                'score'   => $percentage,
                'correct' => $correct,
                'total'   => $total,
                'passed'  => $passed,
                'details' => $details,
                'attempts_left' => $globalMaxAttempts - ($attemptCount + 1),
            ];
        });
    }

    public function getAttemptDetail($attemptId, $userId)
    {
        $attempt = $this->repository->find($attemptId);
        if ($attempt->student_id != $userId) {
            throw new \Exception('Không có quyền xem.', 403);
        }

        $questions = collect(is_array($attempt->questions_snapshot) 
            ? $attempt->questions_snapshot 
            : json_decode($attempt->questions_snapshot, true));
            
        $answerMap = $attempt->answers ?? [];

        $details = $questions->map(function ($q) use ($answerMap) {
            $qId   = $q['id'];
            $studentAns = $answerMap[$qId] ?? null;
            return [
                'question_id'    => $qId,
                'question_text'  => $q['content'],
                'options'        => $q['options'],
                'student_answer' => $studentAns,
                'correct_answer' => $q['correct_index'],
                'is_correct'     => $studentAns !== null && (int)$studentAns === (int)$q['correct_index'],
                'explanation'    => $q['explanation'] ?? '',
            ];
        });

        return [
            'id'         => $attempt->id,
            'quiz_title' => $attempt->quiz->title ?? '',
            'score'      => $attempt->score,
            'correct'    => $attempt->correct,
            'total'      => $attempt->total,
            'passed'     => $attempt->passed,
            'date'       => $attempt->created_at->setTimezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i'),
            'details'    => $details,
        ];
    }
}
