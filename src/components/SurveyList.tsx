import { useEffect, useState } from "react";
import type { Survey } from "../types";
import SurveyApi from "../services/SurveyApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Kyselylista
      </h2>
      {loading && <div>Ladataan kyselyjä...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && surveys && (
        <div className="flex items-center">
          <Table className="w-[500px] mx-auto">
            <TableCaption>Saatavilla olevat kyselyt</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Kysely</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surveys.map((survey) => (
                <TableRow key={survey.surveyId}>
                  <TableCell>{survey.surveyName}</TableCell>
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
