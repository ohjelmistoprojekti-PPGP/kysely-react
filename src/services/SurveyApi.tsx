import type { Survey } from "../types";


// API base url .env file ?
const API_URL = '';

// Fecthes Survey data, kesken
export const getSurveys = async (): Promise<Survey> => {
    try {
        const response = await fetch(`${API_URL}`, {
             method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
        }

        const data = (await response.json() as Survey);
        return data
    } catch (error) {
    console.error('Error fetching survey:', error);
    throw error;
  }
};