import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import SurveyApi from "../services/SurveyApi";
import type { Question, Response, Survey } from "@/types";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "./ui/button";

function SurveyResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const passedSurvey = location.state?.survey;
  const navigate = useNavigate();

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

  const responseCounts: Record<number, number> = responses.reduce(
    (acc, res) => {
      const id = res.question?.questionId;
      if (id != null) {
        acc[id] = (acc[id] || 0) + 1;
      }
      return acc;
    },
    {} as Record<number, number>
  );

  if (loading) return <div className="p-4"> Lataa </div>;

  console.log("responses:", responses);

  return (
    <div className="p-4">
      <div>
        <Link
          to="/"
          className="text-muted-foreground hover:text-primary mb-4 inline-block"
        >
          ← Takaisin kyselylistaan
        </Link>
      </div>
      <h1 className="scroll-m-20 text-center text-4xl font-semibold tracking-tight text-balance pb-5">
        Tulokset
      </h1>
      <p className="text-muted-foreground text-s pb-5">
        Tästä pääset tarkastelemaan vastauksia kysymyskohtaisesti.
      </p>
      <div className="w-full max-w-md mx-auto">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {survey?.surveyName}
              </FieldLabel>
              <FieldDescription className="text-left">
                {survey?.surveyDesc}
              </FieldDescription>
              <FieldDescription className="text-left">
                Kysymykset:
              </FieldDescription>
              {questions.map((q) => (
                <Item variant="outline" key={q.questionId}>
                  <ItemContent>
                    <div className="flex items-center justify-between w-full gap-4">
                      <ItemTitle>{q.questionText}</ItemTitle>
                      <ItemActions>
                        <Button
                          onClick={() =>
                            navigate(`/questions/${q.questionId}/responses`, {
                              state: {
                                q,
                                r: responses.filter(
                                  (res) =>
                                    res.question.questionId === q.questionId
                                ),
                              },
                            })
                          }
                          variant="default"
                          size="sm"
                        >
                          Vastaukset
                        </Button>
                      </ItemActions>
                    </div>

                    <ItemDescription className="text-left">
                      Vastauksia yhteensä: {responseCounts[q.questionId] || 0}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
}

export default SurveyResultsPage;
