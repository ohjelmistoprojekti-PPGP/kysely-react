import { useEffect, useState } from "react";
import { type Survey } from "../types";
import SurveyApi from "../services/SurveyApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await SurveyApi.getSurveys();
      setSurveys(data);
    } catch (error) {
      console.error("Error fetching surveys:", error);
      setError("Failed to fetch surveys. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 pt-15 pb-5 text-4xl font-semibold tracking-tight first:mt-0">
        Tervetuloa SurveyService -palveluun!
      </h1>
      <p className="scroll-m-20 pt-5 pb-5 text-muted-foreground text-s">
        Tällä sivulla voit vastata kyselyihin ja tarkastella niiden tuloksia.
      </p>
      <h2 className="scroll-m-20 pt-5 pb-5 text-2xl font-semibold tracking-tight first:mt-0">
        Saatavilla olevat kyselyt
      </h2>
      {loading && <div>Ladataan kyselyjä...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && surveys && (
        <div className="flex items-center">
          <Table className="w-[500px] mx-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Kyselyn nimi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surveys.map((survey) => (
                <TableRow key={survey.surveyId}>
                  <TableCell>{survey.surveyName}</TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(`/surveys/${survey.surveyId}`, {
                        state: { survey },
                      })
                    }
                  >
                    <Button variant="outline">Vastaa</Button>
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(`/surveys/${survey.surveyId}/responses`, {
                        state: { survey },
                      })
                    }
                  >
                    <Button variant="outline">Tulokset</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

export default SurveyList;
