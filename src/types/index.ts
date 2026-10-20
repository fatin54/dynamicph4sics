export type LearningLayer = 'intuitive' | 'academic' | 'exam';

export interface TerminologyItem {
  id: string;
  bangla: string;
  english: string;
  definition: string;
  banglaDefinition?: string;
  context: string;
  relatedEquation?: string;
  category: 'kinematics' | 'projectile' | 'circular' | 'forces' | 'calculus';
}

export interface CurriculumTopic {
  id: string;
  chapterNumber: number;
  chapterTitleEn: string;
  chapterTitleBn: string;
  sectionCode: string;
  titleEn: string;
  titleBn: string;
  isOfficialChapter3: boolean; // true for Chapter 3 Dynamics, false for Chapter 4 Forces Bridge
  periods: number;
  learningOutcomes: string[];
  learningOutcomesBn: string[];
  prerequisites: string[];
}

export interface DerivationStep {
  stepNumber: number;
  description: string;
  banglaDescription?: string;
  latex: string;
  explanation: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  banglaTitle?: string;
  problemStatement: string;
  banglaStatement?: string;
  givenData: { symbol: string; value: string; unit: string; description: string }[];
  targetVariable: { symbol: string; unit: string; description: string };
  formulaUsed: string;
  solutionSteps: { step: string; latex?: string }[];
  finalAnswer: string;
  keyTakeaway: string;
  boardSource?: string;
}

export interface Misconception {
  wrongBelief: string;
  scientificTruth: string;
  whyItMatters: string;
  quickCheck: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  sectionNumber: string;
  titleEn: string;
  titleBn: string;
  category: 'kinematics' | 'projectile' | 'circular' | 'calculus' | 'bridge-forces';
  isOfficialChapter3: boolean;
  estimatedMinutes: number;

  // 3-Layer Pedagogical Architecture
  layerA_Intuitive: {
    everydayScenario: string;
    banglaScenario: string;
    coreIdea: string;
    banglaCoreIdea: string;
    analogy: string;
    keyObservation: string;
  };

  layerB_Academic: {
    formalDefinition: string;
    banglaFormalDefinition: string;
    physicalPrinciple: string;
    keyEquations: string[];
    derivation?: {
      title: string;
      steps: DerivationStep[];
    };
    assumptions: string[];
    vectorNotationNotes?: string;
  };

  layerC_ExamReady: {
    highFrequencyTrends: string;
    examinerTips: string[];
    commonTraps: string[];
    sampleQuestionSummary: string;
  };

  workedExamples: WorkedExample[];
  misconceptions: Misconception[];
  quickRecap: string[];
  simulationId?: string;
}

export interface FormulaVariable {
  symbol: string;
  name: string;
  banglaName: string;
  unit: string;
  description: string;
  isVector?: boolean;
}

export interface FormulaItem {
  id: string;
  name: string;
  banglaName: string;
  category: 'linear_kinematics' | 'falling_bodies' | 'projectile' | 'circular_motion' | 'forces_momentum' | 'friction_pulley';
  latex: string;
  textbookNotation: string;
  textbookSection: string;
  isOfficialChapter3: boolean;
  variables: FormulaVariable[];
  conditions: string[];
  plainEnglishExplanation: string;
  banglaExplanation: string;
  commonMistakes: string[];
  workedExample: WorkedExample;
  calculatorConfig: {
    variables: {
      symbol: string;
      label: string;
      unit: string;
      defaultValue: number;
      min?: number;
      max?: number;
      step?: number;
    }[];
    solvableVariables: string[];
    solve: (target: string, values: Record<string, number>) => {
      result: number;
      steps: string[];
      unit: string;
    };
  };
}

export type BoardName =
  | 'Dhaka'
  | 'Rajshahi'
  | 'Cumilla'
  | 'Jashore'
  | 'Chattogram'
  | 'Barishal'
  | 'Sylhet'
  | 'Dinajpur'
  | 'Mymensingh'
  | 'Combined Board'
  | 'Madrasah Board'
  | 'BUET Admission Test'
  | 'Ishak Sir Benchmark'
  | 'Curriculum Practice';

export type QuestionSourceCategory =
  | 'Official Board Exam'
  | 'Ishak Sir Textbook Reference'
  | 'Independently Written Practice'
  | 'Admission & Top College';

export interface BoardQuestion {
  id: string;
  year: number;
  board: BoardName;
  paper: 'Physics 1st Paper';
  chapter: string;
  topicId: string;
  questionType: 'MCQ' | 'CQ_Ka' | 'CQ_Kha' | 'CQ_Ga' | 'CQ_Gha' | 'CQ_Full';
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Admission';
  questionEn: string;
  questionBn: string;
  options?: { key: string; textEn: string; textBn: string }[];
  correctOptionKey?: string;
  stemEn?: string;
  stemBn?: string;
  diagramUrl?: string;
  relevantFormulaLatex?: string;
  hintEn: string;
  hintBn: string;
  solutionStepsEn: string[];
  solutionStepsBn: string[];
  finalAnswerEn: string;
  finalAnswerBn: string;
  examinerMarkingTips: string;
  commonMistakes: string;
  verificationStatus:
    | 'Verified Official Board Paper'
    | 'Verified Textbook Exercise'
    | 'Admission Standard Model'
    | 'Independently Written Practice'
    | 'Textbook Concept Reference (Prof. Md. Ishaque)';
  sourceReference: string;
  sourceCategory?: QuestionSourceCategory;
  authorReference?: string;
}

export interface CreativeQuestionItem {
  id: string;
  year: number;
  board: BoardName;
  topicId: string;
  stemEn: string;
  stemBn: string;
  scenarioType: string;
  parts: {
    part: 'Ka' | 'Kha' | 'Ga' | 'Gha';
    labelEn: string;
    labelBn: string;
    marks: number;
    questionEn: string;
    questionBn: string;
    guidingQuestions: string[];
    keyFormula?: string;
    modelAnswerEn: string;
    modelAnswerBn: string;
    markingCriteria: { mark: number; condition: string }[];
    alternativeMethods?: string;
  }[];
  sourceReference: string;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  questionEn: string;
  questionBn: string;
  options: { key: string; text: string; isCorrect: boolean; explanation: string }[];
  difficulty: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4';
  hint: string;
}

export interface StudentProgress {
  completedLessons: string[];
  bookmarkedQuestions: string[];
  bookmarkedFormulas: string[];
  quizScores: Record<string, { correct: number; total: number; timestamp: number }>;
  masteryLevels: Record<string, number>; // topicId -> level 1 to 5
}
