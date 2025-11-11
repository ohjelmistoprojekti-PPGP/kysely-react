export interface Survey {
  surveyId: number;
  surveyName: string;
  surveyDesc?: string;
  createdDate: string;
  startingDate: string;
  endingDate: string;
}

export interface Question {
  id: number;
  questionText: string;
  surveyId: number;
}

export interface Response {
  questionId: number;
  value: string;
}

//Tämä myöhemmässä vaiheessa
// export interface SurveyResponse {
//     surveyId: number;
//     answers: Response[];
// }
