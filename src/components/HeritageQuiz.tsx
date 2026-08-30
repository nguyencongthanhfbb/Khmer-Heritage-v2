import React, { useState } from 'react';
import { HERITAGE_QUIZ_QUESTIONS } from '../data/quizData';
import { HeritageQuizQuestion } from '../types/museum';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Award, 
  HelpCircle,
  Landmark
} from 'lucide-react';

interface HeritageQuizProps {
  onExploreObject?: (id: string) => void;
}

export const HeritageQuiz: React.FC<HeritageQuizProps> = ({ onExploreObject }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const questions = HERITAGE_QUIZ_QUESTIONS;
  const currentQuestion: HeritageQuizQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="space-y-10 pb-24" id="heritage-quiz-view">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Trắc Nghiệm Khảo Cổ & Di Sản (Heritage & Archaeology Quiz)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            Thử Thách Tri Thức Văn Minh Khmer
          </h1>
          <p className="text-stone-400 text-sm font-serif max-w-3xl">
            Kiểm tra hiểu biết lịch sử, kiến trúc đền núi và biểu tượng học tôn giáo qua các câu hỏi nghiên cứu kèm trích dẫn tài liệu viện nghiên cứu EFEO, Met Museum và CNRS.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-stone-900 border border-stone-800 px-4 py-2 rounded-2xl shrink-0">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono text-stone-300">
            Điểm số: <strong className="text-amber-400">{score}</strong> / {questions.length}
          </span>
        </div>
      </div>

      {/* Quiz Screen or Completion Screen */}
      {!isQuizCompleted ? (
        <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Progress & Category Top Bar */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium">
              Chủ đề: {currentQuestion.category}
            </span>
            <span className="text-xs font-mono text-stone-400">
              Câu hỏi {currentQuestionIndex + 1} trên {questions.length}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 leading-relaxed">
              {currentQuestion.question}
            </h2>
            {currentQuestion.questionKhmer && (
              <p className="text-sm font-serif italic text-amber-400/80">
                {currentQuestion.questionKhmer}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3" id="quiz-options-list">
            {currentQuestion.options.map((optionText, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;

              let optionClasses = 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/50 hover:bg-stone-850';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionClasses = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30';
                } else if (isSelected && !isCorrect) {
                  optionClasses = 'bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/30';
                } else {
                  optionClasses = 'bg-stone-950/40 border-stone-850 text-stone-400 opacity-60';
                }
              } else if (isSelected) {
                optionClasses = 'bg-amber-500/15 border-amber-500 text-amber-200 ring-2 ring-amber-500/30';
              }

              return (
                <button
                  key={idx}
                  id={`option-${idx}`}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between gap-4 cursor-pointer ${optionClasses}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-serif">{optionText}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Scholarly Citation Reveal (After Submission) */}
          {isAnswerSubmitted && (
            <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center space-x-2">
                {selectedOptionIndex === currentQuestion.correctAnswerIndex ? (
                  <div className="flex items-center space-x-2 text-emerald-400 text-sm font-mono font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Chính Xác! (Scholarly Validated)</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-rose-400 text-sm font-mono font-bold">
                    <XCircle className="w-5 h-5" />
                    <span>Chưa Đúng! Đáp án chuẩn là phương án {String.fromCharCode(65 + currentQuestion.correctAnswerIndex)}.</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                  Giải Thích Học Thuật Khảo Cổ:
                </span>
                <p className="text-sm font-serif text-stone-200 leading-relaxed">
                  {currentQuestion.scholarlyExplanation}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-stone-400">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Trích dẫn: {currentQuestion.academicCitation}</span>
                </div>

                {currentQuestion.relatedObjectId && onExploreObject && (
                  <button
                    onClick={() => onExploreObject(currentQuestion.relatedObjectId!)}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1 cursor-pointer shrink-0"
                  >
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Xem hiện vật liên quan →</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <span className="text-xs font-mono text-stone-400">
              {!isAnswerSubmitted ? 'Chọn 1 phương án rồi nhấn Xác Nhận' : 'Đã đối chiếu tài liệu học thuật'}
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIndex === null}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-stone-950 font-bold text-xs font-mono flex items-center space-x-2 transition-colors cursor-pointer shadow-md"
              >
                <span>Xác Nhận Đáp Án</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer shadow-lg"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả Tổng Kết'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Completion Score Screen */
        <div className="rounded-3xl bg-stone-900 border border-stone-800 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-bold text-stone-100">
              Hoàn Thành Thử Thách Di Sản!
            </h2>
            <p className="text-stone-400 text-sm font-serif max-w-md mx-auto">
              Bạn đã hoàn thành bộ câu hỏi khảo cổ học và văn hóa học thuật Khmer Heritage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 max-w-sm mx-auto space-y-2">
            <span className="text-xs font-mono text-stone-400 uppercase">Tổng Điểm Đạt Được</span>
            <div className="text-4xl font-serif font-bold text-amber-400">
              {score} / {questions.length}
            </div>
            <p className="text-xs font-serif text-stone-300 pt-1">
              {score === questions.length
                ? 'Xuất sắc! Bạn có kiến thức chuyên gia khảo cổ học Angkor.'
                : score >= 3
                ? 'Rất tốt! Bạn am hiểu sâu sắc về văn minh và mỹ thuật Khmer.'
                : 'Tiếp tục khám phá bảo tàng để trau dồi thêm tri thức di sản nhé!'}
            </p>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm font-mono inline-flex items-center space-x-2 transition-colors cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Bộ Câu Hỏi</span>
          </button>
        </div>
      )}

    </div>
  );
};
