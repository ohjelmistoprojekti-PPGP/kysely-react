export interface Survey {
  surveyId: number;
  surveyName: string;
  surveyDesc?: string;
  createdDate: string;
  startingDate: string;
  endingDate: string;
}

export interface Question {
  questionId: number;
  questionText: string;
  questionType: string;
  options: string[];
  surveyId: number;
}

export interface Response {
  responseId?: number;
  responseText: string;
  question: {
    questionId?: number;
    questionText?: string;
    questionType?: string;
    options?: unknown[];
  };
}
