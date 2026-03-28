import { useCallback, useState } from "react";
import { useSubmitQuizScore } from "../hooks/useQueries";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Question {
  id: number;
  scenario: string;
  question: string;
  options: { text: string; clean: boolean }[];
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    scenario: "You need to power 500 homes for the next 25 years.",
    question:
      "Which energy source is cleanest and most cost-effective long-term?",
    options: [
      { text: "Coal-fired power plant", clean: false },
      { text: "Utility-scale solar farm", clean: true },
      { text: "Natural gas turbine", clean: false },
      { text: "Oil generator", clean: false },
    ],
    explanation:
      "Solar farms have near-zero operating costs and zero emissions over their 25+ year lifespan.",
  },
  {
    id: 2,
    scenario: "A coastal city wants 24/7 reliable power regardless of weather.",
    question: "Which combination provides the most reliable renewable supply?",
    options: [
      { text: "Solar panels only", clean: false },
      { text: "Wind turbines only", clean: false },
      { text: "Wind + Battery Storage + Grid", clean: true },
      { text: "Diesel generators as backup", clean: false },
    ],
    explanation:
      "Combining wind with battery storage and grid connection ensures 24/7 clean supply.",
  },
  {
    id: 3,
    scenario: "A factory needs high-heat industrial processes.",
    question: "Which clean energy option can directly provide industrial heat?",
    options: [
      { text: "Photovoltaic solar", clean: false },
      { text: "Concentrated Solar Power (CSP)", clean: true },
      { text: "Offshore wind", clean: false },
      { text: "Tidal energy", clean: false },
    ],
    explanation:
      "CSP uses mirrors to focus sunlight, generating temperatures up to 1000°C for industrial use.",
  },
  {
    id: 4,
    scenario: "Iceland has abundant volcanic activity beneath its surface.",
    question: "What renewable energy would be most practical for Iceland?",
    options: [
      { text: "Solar panels", clean: false },
      { text: "Coal with carbon capture", clean: false },
      { text: "Geothermal energy", clean: true },
      { text: "Nuclear fission", clean: false },
    ],
    explanation:
      "Iceland already gets 66% of its primary energy from geothermal — a model for volcanic regions.",
  },
  {
    id: 5,
    scenario: "A developing nation wants to rapidly electrify rural villages.",
    question: "Which is the fastest, most scalable solution?",
    options: [
      { text: "Building coal power plants", clean: false },
      { text: "Extending the national grid", clean: false },
      { text: "Off-grid solar microgrids", clean: true },
      { text: "Importing diesel generators", clean: false },
    ],
    explanation:
      "Solar microgrids can be deployed in weeks and need no transmission infrastructure.",
  },
  {
    id: 6,
    scenario: "You want to charge your EV with the lowest carbon footprint.",
    question: "When should you charge to maximize renewable energy use?",
    options: [
      { text: "Midnight when grid demand is low", clean: false },
      { text: "Peak hours 6-9 PM", clean: false },
      { text: "Midday when solar generation peaks", clean: true },
      { text: "Any time - it doesn't matter", clean: false },
    ],
    explanation:
      "Midday charging aligns with peak solar generation, maximizing use of renewable power.",
  },
  {
    id: 7,
    scenario: "A country wants to reduce oil imports for transportation.",
    question: "Which technology has the highest impact per dollar invested?",
    options: [
      { text: "Hydrogen combustion engines", clean: false },
      { text: "CNG (Compressed Natural Gas) vehicles", clean: false },
      { text: "Electric vehicles + renewable grid", clean: true },
      { text: "Biofuel blends (E10)", clean: false },
    ],
    explanation:
      "EVs on a renewable grid are 3x more energy-efficient and eliminate oil dependence completely.",
  },
  {
    id: 8,
    scenario: "A city wants zero-carbon heating for its buildings in winter.",
    question: "Which system is most efficient for building heat?",
    options: [
      { text: "Natural gas boilers", clean: false },
      { text: "Electric resistance heating", clean: false },
      { text: "Heat pumps powered by renewables", clean: true },
      { text: "Wood-burning stoves", clean: false },
    ],
    explanation:
      "Heat pumps achieve 300-400% efficiency by moving heat, not generating it — ideal for zero-carbon buildings.",
  },
];

const OPTION_LABELS = ["A", "B", "C", "D"];

const grades = [
  { min: 8, grade: "A+", label: "Energy Champion", color: "#7cff4d" },
  { min: 6, grade: "A", label: "Green Expert", color: "#7cff4d" },
  { min: 4, grade: "B", label: "Eco Learner", color: "#ffd24a" },
  { min: 2, grade: "C", label: "Clean Starter", color: "#23c8ff" },
  { min: 0, grade: "D", label: "Keep Learning", color: "#ff6b35" },
];

function getGrade(score: number) {
  return grades.find((g) => score >= g.min) || grades[grades.length - 1];
}

export default function QuizSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);
  const submitScore = useSubmitQuizScore();

  const question = questions[currentQ];
  const score = answers.filter(Boolean).length;

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(idx);
      setShowExplanation(true);
      setAnswers((prev) => [...prev, questions[currentQ].options[idx].clean]);
    },
    [selectedAnswer, currentQ],
  );

  const handleNext = useCallback(() => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ((p) => p + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      const finalScore = [...answers].filter(Boolean).length;
      submitScore.mutate({
        userId: `user_${Date.now()}`,
        score: BigInt(finalScore),
        totalQuestions: BigInt(questions.length),
      });
    }
  }, [currentQ, answers, submitScore]);

  const handleReset = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowExplanation(false);
    setFinished(false);
  };

  const grade = getGrade(score);

  return (
    <section
      id="quiz"
      className="py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(124,255,77,0.04) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="section-reveal">
          <div className="text-center mb-12">
            <p
              className="text-xs font-orbitron tracking-[0.3em] uppercase mb-3"
              style={{ color: "#7cff4d" }}
            >
              Knowledge Check
            </p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white tracking-wide">
              TEST YOUR ENERGY KNOWLEDGE
            </h2>
          </div>

          {!finished ? (
            <div className="glass-card rounded-2xl p-8" data-ocid="quiz.panel">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-orbitron text-gray-500 tracking-wider">
                  QUESTION {currentQ + 1} / {questions.length}
                </span>
                <span
                  className="text-xs font-orbitron tracking-wider"
                  style={{ color: "#7cff4d" }}
                >
                  SCORE: {score}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 mb-8">
                <div
                  className="h-1.5 rounded-full bg-[#7cff4d] transition-all duration-500"
                  style={{
                    width: `${(currentQ / questions.length) * 100}%`,
                    boxShadow: "0 0 10px rgba(124,255,77,0.5)",
                  }}
                />
              </div>

              <div
                className="mb-3 px-4 py-2 rounded-lg text-xs text-gray-400"
                style={{
                  background: "rgba(35,200,255,0.08)",
                  border: "1px solid rgba(35,200,255,0.2)",
                }}
              >
                <span className="text-[#23c8ff] font-semibold">SCENARIO: </span>
                {question.scenario}
              </div>

              <h3 className="font-orbitron font-semibold text-base text-white mb-6 leading-relaxed">
                {question.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {question.options.map((opt, idx) => {
                  let style: React.CSSProperties = {};
                  let extra = "";
                  if (selectedAnswer !== null) {
                    if (opt.clean) {
                      style = {
                        border: "1px solid #7cff4d",
                        background: "rgba(124,255,77,0.12)",
                        boxShadow: "0 0 15px rgba(124,255,77,0.3)",
                      };
                      extra = " text-[#7cff4d]";
                    } else if (idx === selectedAnswer && !opt.clean) {
                      style = {
                        border: "1px solid #ff4444",
                        background: "rgba(255,68,68,0.12)",
                      };
                      extra = " text-[#ff4444]";
                    } else {
                      style = { opacity: 0.4 };
                    }
                  }
                  return (
                    <button
                      type="button"
                      key={opt.text}
                      onClick={() => handleAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 rounded-xl text-sm text-left transition-all duration-300 glass-card${extra}`}
                      style={selectedAnswer === null ? undefined : style}
                      data-ocid="quiz.button"
                    >
                      <span
                        className="font-orbitron text-xs mr-2"
                        style={{ color: "#7cff4d" }}
                      >
                        {OPTION_LABELS[idx]}.
                      </span>
                      {opt.text}
                      {selectedAnswer !== null && opt.clean && (
                        <span className="ml-2">✓</span>
                      )}
                      {selectedAnswer === idx && !opt.clean && (
                        <span className="ml-2">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div
                  className="mb-6 p-4 rounded-xl text-sm text-gray-300 leading-relaxed"
                  style={{
                    background: "rgba(124,255,77,0.06)",
                    border: "1px solid rgba(124,255,77,0.2)",
                  }}
                  data-ocid="quiz.panel"
                >
                  <span className="text-[#7cff4d] font-semibold font-orbitron text-xs tracking-wider">
                    EXPLANATION:{" "}
                  </span>
                  {question.explanation}
                </div>
              )}

              {selectedAnswer !== null && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl font-orbitron font-semibold text-sm tracking-widest transition-all duration-300 hover:shadow-neon hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, #7cff4d, #00ff88)",
                    color: "#0a0f14",
                  }}
                  data-ocid="quiz.primary_button"
                >
                  {currentQ + 1 < questions.length
                    ? "NEXT QUESTION →"
                    : "SEE RESULTS"}
                </button>
              )}
            </div>
          ) : (
            <div
              className="glass-card rounded-2xl p-10 text-center"
              style={{
                border: `1px solid ${grade.color}44`,
                boxShadow: `0 0 40px ${grade.color}20`,
              }}
              data-ocid="quiz.success_state"
            >
              <div
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center font-orbitron font-black text-4xl"
                style={{
                  background: `${grade.color}22`,
                  border: `3px solid ${grade.color}`,
                  color: grade.color,
                  boxShadow: `0 0 30px ${grade.color}50`,
                }}
              >
                {grade.grade}
              </div>
              <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                {grade.label}
              </h3>
              <p className="text-gray-400 mb-6">
                You answered{" "}
                <span className="font-bold" style={{ color: grade.color }}>
                  {score} out of {questions.length}
                </span>{" "}
                correctly!
              </p>

              <div className="grid grid-cols-4 gap-3 mb-8">
                {answers.map((correct, i) => (
                  <div
                    key={questions[i].id}
                    className="h-2 rounded-full"
                    style={{
                      background: correct ? "#7cff4d" : "#ff4444",
                      boxShadow: correct
                        ? "0 0 8px rgba(124,255,77,0.5)"
                        : "0 0 8px rgba(255,68,68,0.5)",
                    }}
                  />
                ))}
              </div>

              <div
                className="mb-8 p-5 rounded-xl"
                style={{
                  background: `${grade.color}10`,
                  border: `1px solid ${grade.color}30`,
                }}
              >
                <p className="text-sm text-gray-300 leading-relaxed">
                  {score === 8
                    ? "Perfect score! You're a renewable energy expert. Share your knowledge to inspire others toward a sustainable future."
                    : score >= 6
                      ? "Excellent work! You have strong knowledge of renewable energy. Keep exploring to become a true expert."
                      : score >= 4
                        ? "Good effort! You understand the basics. Explore our sections above to deepen your knowledge."
                        : "Great start! Scroll up to explore the interactive sections and learn more about clean energy solutions."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 rounded-full font-orbitron font-semibold text-sm tracking-widest transition-all duration-300 hover:scale-105"
                style={{
                  border: `1px solid ${grade.color}`,
                  color: grade.color,
                  background: `${grade.color}15`,
                }}
                data-ocid="quiz.secondary_button"
              >
                RETAKE QUIZ
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
