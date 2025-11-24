export type ILogin = {
  email: string;
  password: string;
};

export type IRegister = {
  email: string;
  password: string;
  confirm_password: string;
  username: string;
  full_name: string;
  role: "STUDENT" | "TEACHER";
};

export type IUserData = {
  email: string;
  isAuthenticated: boolean;
  role: string;
  username: string;
  full_name: string;
  exp: number;
  id: number;
};

export type IMaterial = {
  title: string;
  content: string;
  image_url: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PAKARLELE";
  expReward: number;
  expectedTime: number;
  id?: number;
};

export type INotebook = {
  title: string;
  content: string;
  userId: number;
};

export type IQuestion = {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: number;
};

export type IQuiz = {
  title: string;
  summary: string;
  materialId: number;
  questions: IQuestion[];
};

export type IDeck = {
  title: string;
  userId: number;
};

export type IFlashcard = {
  question: string;
  answer: string;
  hint: string;
  deckId: string;
};

export type IEditFlashcard = {
  question: string;
  answer: string;
  hint: string;
  flashcardId: string;
};
