import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import SurveyApi from "../services/SurveyApi";
import type { Question, Survey, Response } from "@/types";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatDate } from "@/utils/formatter";

function SurveyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const passedSurvey = location.state?.survey;

  const [survey, setSurvey] = useState<Survey | null>(passedSurvey);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!passedSurvey) {
          const fetchedSurvey = await SurveyApi.getSurveyById(Number(id));
          setSurvey(fetchedSurvey);
        }
        const questions = await SurveyApi.getQuestionsBySurveyId(Number(id));
        setQuestions(questions);
      } catch (err) {
        console.error("Error fetching survey data:", err);
        setError("Failed to load survey. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchQuestions();
  }, [id, passedSurvey]);

  const handleResponseChange = (questionId: number, text: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (Object.keys(responses).length === 0) {
        alert("Vastaa ainakin yhteen kysymykseen ennen lähettämistä.");
        return;
      }

      // Muusta vastaukset Response arrayksi, lähetetään Question objekti
      const responseArray: Response[] = Object.entries(responses).map(
        ([questionId, responseText]) => ({
          question: { questionId: Number(questionId) },
          responseText,
        })
      );

      console.log("Submitting responses:", responseArray);

      await SurveyApi.postSurveyResponses(Number(id), responseArray);

      alert("Vastaukset lähetetty onnistuneesti!");

      navigate("/");
      
  
    } catch (error) {
      console.error("Error submitting responses:", error);
      alert("Virhe lähetyksessä. Yritä uudelleen.");
    }
  };

  if (loading) return <div className="p-4">Ladataan kyselyä...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!survey) return <div className="p-4">Kyselyä ei löytynyt</div>;

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

      <div className="w-full max-w-md mx-auto">
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>{survey.surveyName}</FieldLegend>
              <FieldDescription>{survey.surveyDesc}</FieldDescription>
              <FieldDescription>
                Vastausaika:{<br />}
                {formatDate(survey.startingDate)} -{" "}
                {formatDate(survey.endingDate)}
              </FieldDescription>
            </FieldSet>

            <FieldGroup>
              {questions.map((q) => (
                <Field className="p-2" key={q.questionId}>
                  {/* TEXT INPUT */}
                  {q.questionType === "text" && (
                    <Field>
                      <FieldLabel>{q.questionText}</FieldLabel>
                      <Textarea
                        className="w-auto h-30"
                        value={responses[q.questionId] || ""}
                        onChange={(e) =>
                          handleResponseChange(q.questionId, e.target.value)
                        }
                        placeholder="Kirjoita vastauksesi tähän..."
                      />
                    </Field>
                  )}
                  {/* MULTIPLE CHOICE RADIO BUTTONS */}
                  {q.questionType === "radioButton" && (
                    <Field>
                      <FieldLabel>{q.questionText}</FieldLabel>
                      <RadioGroup
                        value={responses[q.questionId] || ""}
                        onValueChange={(value) =>
                          handleResponseChange(q.questionId, value)
                        }
                      >
                        {q.options.map((option) => (
                          <Field orientation="horizontal" key={option}>
                            <RadioGroupItem
                              value={option}
                              id={`question-${q.questionId}-${option}`}
                            />
                            <FieldLabel
                              htmlFor={`question-${q.questionId}-${option}`}
                              className="font-normal"
                            >
                              {option}
                            </FieldLabel>
                          </Field>
                        ))}
                      </RadioGroup>
                    </Field>
                  )}
                </Field>
              ))}
            </FieldGroup>
            <Field orientation="horizontal">
              <Button type="submit" onClick={handleSubmit}>
                Lähetä
              </Button>
              <Button variant="outline" type="button">
                <Link to="/">Peruuta</Link>
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

export default SurveyDetailPage;
