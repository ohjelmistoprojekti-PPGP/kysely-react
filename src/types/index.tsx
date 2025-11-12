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
  surveyId: number;
}

export interface Response {
  responseId?: number;
  responseText: string;
  question: { questionId: number };
}

//Tämä myöhemmässä vaiheessa
// export interface SurveyResponse {
//     surveyId: number;
//     answers: Response[];
// }
