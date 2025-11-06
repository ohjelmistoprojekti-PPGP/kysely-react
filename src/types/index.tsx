
export interface Survey {
    id: number;
    name: string;
    desc?: string;
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
