import type { Question, Survey, Response } from "../types";

const API_URL = import.meta.env.VITE_BASE_API_URL;

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

// Get Survey by ID
const getSurveyById = async (surveyId: number): Promise<Survey | null> => {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json() as Survey;
  } catch (error) {
    console.error(`Error fetching survey ${surveyId}:`, error);
    return null;
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
    console.error(`Error fetching questions for survey ${surveyId}`, error);
    return [];
  }
};


const postSurveyResponses = async (
  surveyId: number,
  responses: Response[]
): Promise<Response[]> => {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(responses),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error submitting survey responses for survey ${surveyId}:`, error);
    throw error;
  }
};

const SurveyApi = {
  getSurveys,
  getSurveyById,
  getQuestionsBySurveyId,
  postSurveyResponses,
};

export default SurveyApi;
