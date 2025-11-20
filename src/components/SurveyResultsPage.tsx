import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import SurveyApi from "../services/SurveyApi";
import type { Question, Response, Survey } from "@/types";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

function SurveyResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const passedSurvey = location.state?.survey;

  const [survey, setSurvey] = useState<Survey | null>(passedSurvey);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        // setError(null);

        if (!passedSurvey) {
          const fetchedSurvey = await SurveyApi.getSurveyById(Number(id));
          setSurvey(fetchedSurvey);
        }
        const questions = await SurveyApi.getQuestionsBySurveyId(Number(id));
        setQuestions(questions);
        const responses = await SurveyApi.getResponsesBySurveyId(Number(id));
        setResponses(responses);
      } catch (err) {
        console.error("Error fetching survey data:", err);
        // setError("Failed to load survey. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResponses();
  }, [id, passedSurvey]);

  if (loading) return <div className="p-4"> Lataa </div>;

  return (
    <div>
      <div className="p-4">
        <Link
          to="/"
          className="text-muted-foreground hover:text-primary mb-4 inline-block"
        >
          ← Takaisin kyselylistaan
        </Link>
      </div>
      <div className="w-full max-w-md">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>{survey?.surveyName}</FieldLabel>

              <Item variant="outline">
                {questions.map((q) => (
                  <ItemContent key={q.questionId}>
                    <ItemTitle>{q.questionText}</ItemTitle>

                    {responses
                      .filter((r) => r.question.questionId === q.questionId)
                      .map((r) => (
                        <ItemDescription key={r.responseId}>
                          {r.responseText}
                        </ItemDescription>
                      ))}
                  </ItemContent>
                ))}
              </Item>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
}

export default SurveyResultsPage;
