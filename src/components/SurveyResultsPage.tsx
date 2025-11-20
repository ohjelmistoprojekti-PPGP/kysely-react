import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SurveyApi from "../services/SurveyApi";
import type { Question, Response } from "@/types";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
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

  useEffect(() => {
    async function load() {
      if (!id) return;

      const q = await SurveyApi.getQuestionsBySurveyId(Number(id));
      const r = await SurveyApi.getResponsesBySurveyId(Number(id));

      setQuestions(q);
      setResponses(r);
      setLoading(false);
    }
    load();
  }, [id]);

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
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>Tähän kysymysteksti</ItemTitle>
                  <ItemDescription>Vastaus 1</ItemDescription>
                  <ItemDescription>Vastaus 2</ItemDescription>
                </ItemContent>
              </Item>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
}

export default SurveyResultsPage;
