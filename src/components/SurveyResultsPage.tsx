import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SurveyApi from "../services/SurveyApi";
import type { Question, Response } from "@/types";

function SurveyResultsPage = () => {
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

return