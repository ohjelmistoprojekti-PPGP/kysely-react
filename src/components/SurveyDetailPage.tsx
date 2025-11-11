import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import SurveyApi from "../services/SurveyApi";
import type { Question, Survey } from "@/types";

function SurveyDetailPage() {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [survey, setSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    const fetchSurveyAndQuestions = async () => {
      const surveys = await SurveyApi.getSurveys();
      const selectedSurvey =
        surveys.find((s) => s.surveyId === Number(surveyId)) || null;
      setSurvey(selectedSurvey);

      const questionList = await SurveyApi.getQuestionsBySurveyId(
        Number(surveyId)
      );
      setQuestions(questionList);
    };

    if (surveyId) fetchSurveyAndQuestions();
  }, [surveyId]);

  if (!survey) return <div className="p-4">Loading survey...</div>;

  return (
    <div className="p-4">
      <Link to="/surveys" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Surveys
      </Link>
      <h2 className="text-2xl font-semibold mb-2">{survey.surveyName}</h2>
      <p className="text-gray-600 mb-4">
        Start: {survey.startingDate} | End: {survey.endingDate}
      </p>

      <h3 className="text-lg font-semibold mb-2">Questions</h3>
      <ul className="space-y-1">
        {questions.map((q) => (
          <li key={q.questionId} className="p-2 bg-gray-50 rounded-md">
            {q.questionText}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SurveyDetailPage;
