import type { Question, Survey } from "../types";

// API base url .env file ?
const API_URL = "http://localhost:8080/api";

// Get Surveys
const getSurveys = async (): Promise<Survey[]> => {
  try {
    const response = await fetch(`${API_URL}/surveys`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = (await response.json()) as Survey[];
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching survey:", error);
    return [];
  }
};

//Get Questions
const getQuestionsBySurveyId = async (
  surveyId: number
): Promise<Question[]> => {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = (await response.json()) as Question[];
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching questions for survey ${surveyId}", error);
    return [];
  }
};

const SurveyApi = {
  getSurveys,
  getQuestionsBySurveyId,
};

export default SurveyApi;
