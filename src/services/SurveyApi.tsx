import type { Survey } from "../types";


// API base url .env file ?
const API_URL = 'http://localhost:8080/api';

// Fecthes Survey data, kesken
export const getSurveys = async (): Promise<Survey> => {
    try {
        const response = await fetch(`${API_URL}/surveys`, {
             method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
        }

        const data = (await response.json() as Survey);
        console.log(data)
        return data
    } catch (error) {
    console.error('Error fetching survey:', error);
    throw error;
  }
};