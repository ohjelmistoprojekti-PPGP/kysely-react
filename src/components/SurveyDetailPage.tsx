import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SurveyApi from "../services/SurveyApi";
import type { Question, Survey } from "@/types";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea"


function SurveyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const passedSurvey = location.state?.survey;

  const [survey, setSurvey] = useState<Survey | null>(passedSurvey);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveyAndQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const survey = await SurveyApi.getSurveyById(Number(id));
        setSurvey(survey);
        const questions = await SurveyApi.getQuestionsBySurveyId(Number(id));
        setQuestions(questions);
      } catch (err) {
        console.error("Error fetching survey data:", err);
        setError("Failed to load survey. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSurveyAndQuestions();
  }, [id]);

  if (loading) return <div className="p-4">Ladataan kyselyä...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!survey) return <div className="p-4">Kyselyä ei löytynyt</div>;

  return (
    <div>
      <div className="p-4">
        <Link to="/" className="text-muted-foreground hover:text-primary mb-4 inline-block">
          ← Takaisin kyselylistaan
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto">
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>{survey.surveyName}</FieldLegend>
              <FieldDescription>
                {survey.surveyDesc}
              </FieldDescription>
              <FieldDescription>
                Vastausaika:{<br />}
                {survey.startingDate} - {survey.endingDate}
              </FieldDescription>
            </FieldSet>

            <FieldGroup>
              {questions.map((q) => (
                <Field>
                  <FieldLabel key={q.questionId}>
                    {q.questionText}
                  </FieldLabel>
                  <Textarea />
                </Field>
              ))}

            </FieldGroup>
          </FieldGroup>
        </form>
      </div>
    </div>

  );
}

export default SurveyDetailPage;
