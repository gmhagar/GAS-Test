
import React, { useState } from 'react';
import { QUIZ_DATA } from '../constants';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react';

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUIZ_DATA[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_DATA.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-xl p-8 md:p-12 border border-[#D8DCDB] shadow-sm text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-[#007db3]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#007db3]">
          <Award size={48} />
        </div>
        <h2 className="text-3xl font-extrabold text-[#003359] mb-2">Knowledge Check Complete!</h2>
        <p className="text-[#373737] opacity-70 mb-8">You've finished the SABS Optionality Changes Quiz.</p>
        
        <div className="inline-block bg-[#f8fafc] border border-[#D8DCDB] rounded-xl p-6 mb-10">
          <div className="text-5xl font-black text-[#003359] mb-2">{score} / {QUIZ_DATA.length}</div>
          <div className="text-sm font-bold text-[#007db3] uppercase tracking-widest">Final Score</div>
        </div>

        <div className="prose prose-blue prose-sm mx-auto mb-10 text-[#373737]">
          {score >= 8 ? (
            <p className="font-medium">Excellent work! You have a strong grasp of the upcoming reforms and are well-prepared to guide customers through their options.</p>
          ) : score >= 5 ? (
            <p className="font-medium">Good job. You understand the basics, but you might want to review the Coverage Reference section to solidify your knowledge on specific optional benefits.</p>
          ) : (
            <p className="font-medium">This is a complex transition. We recommend reviewing the Change Summary and Coverage Reference sections before attempting the quiz again.</p>
          )}
        </div>

        <button 
          onClick={restartQuiz}
          className="bg-[#003359] text-white px-8 py-4 rounded-lg font-bold flex items-center mx-auto shadow-lg hover:bg-[#007db3] transition-all group"
        >
          <RotateCcw size={20} className="mr-2 group-hover:rotate-180 transition-transform duration-500" /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 border border-[#D8DCDB] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-xs font-bold text-[#007db3] uppercase tracking-widest">Question {currentQuestion.id} of {QUIZ_DATA.length}</div>
        <div className="w-48 h-2 bg-[#D8DCDB] rounded-full overflow-hidden hidden sm:block">
          <div 
            className="h-full bg-[#007db3] transition-all duration-500" 
            style={{ width: `${(currentQuestion.id / QUIZ_DATA.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-extrabold text-[#003359] mb-8 leading-tight">
        {currentQuestion.question}
      </h3>

      <div className="space-y-3 mb-10">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrectAnswer = isSubmitted && option === currentQuestion.correctAnswer;
          const isWrongSelection = isSubmitted && isSelected && !isCorrect;

          let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all flex items-start group ";
          if (isSubmitted) {
            if (isCorrectAnswer) btnClass += "border-[#006140] bg-[#006140]/5 text-[#006140] ";
            else if (isWrongSelection) btnClass += "border-[#cc0000] bg-[#cc0000]/5 text-[#cc0000] ";
            else btnClass += "border-[#D8DCDB] opacity-50 cursor-default ";
          } else {
            if (isSelected) btnClass += "border-[#007db3] bg-[#007db3]/5 text-[#007db3] ";
            else btnClass += "border-[#D8DCDB] hover:border-[#007db3]/50 text-[#373737] ";
          }

          return (
            <button 
              key={idx} 
              disabled={isSubmitted}
              onClick={() => handleOptionSelect(option)}
              className={btnClass}
            >
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mr-4 mt-0.5 font-bold text-xs transition-colors ${
                isSelected || isCorrectAnswer ? 'border-current' : 'border-[#D8DCDB] group-hover:border-[#007db3]/50'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-sm md:text-base font-medium">{option}</span>
              {isSubmitted && isCorrectAnswer && <CheckCircle className="ml-auto shrink-0 self-center" size={20} />}
              {isSubmitted && isWrongSelection && <XCircle className="ml-auto shrink-0 self-center" size={20} />}
            </button>
          );
        })}
      </div>

      {isSubmitted ? (
        <div className={`p-6 rounded-lg border mb-8 animate-in slide-in-from-top-2 duration-300 ${isCorrect ? 'bg-[#006140]/5 border-[#006140]/20' : 'bg-[#cc0000]/5 border-[#cc0000]/20'}`}>
          <div className={`flex items-center font-bold mb-2 ${isCorrect ? 'text-[#006140]' : 'text-[#cc0000]'}`}>
            {isCorrect ? <CheckCircle size={20} className="mr-2" /> : <XCircle size={20} className="mr-2" />}
            {isCorrect ? 'Correct!' : 'Not quite right'}
          </div>
          <p className="text-sm leading-relaxed text-[#373737]">
            {isCorrect ? currentQuestion.feedbackCorrect : currentQuestion.feedbackIncorrect}
          </p>
        </div>
      ) : null}

      <div className="flex justify-end">
        {!isSubmitted ? (
          <button 
            disabled={!selectedOption}
            onClick={handleSubmit}
            className={`px-8 py-3 rounded-lg font-bold transition-all shadow-md ${
              selectedOption ? 'bg-[#003359] text-white hover:bg-[#007db3]' : 'bg-[#D8DCDB] text-[#373737]/40 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="bg-[#007db3] text-white px-8 py-3 rounded-lg font-bold flex items-center shadow-md hover:bg-[#003359] transition-all"
          >
            {currentQuestionIndex < QUIZ_DATA.length - 1 ? 'Next Question' : 'Finish Quiz'} <ChevronRight size={20} className="ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
