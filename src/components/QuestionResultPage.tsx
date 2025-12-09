import { useLocation, useNavigate } from "react-router-dom";
import type { Response } from "@/types";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Item, ItemContent, ItemDescription } from "./ui/item";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card } from "./ui/card";

function QuestionResultPage() {
  const location = useLocation();
  const passedQuestion = location.state?.q;
  const passedResponses: Response[] = location.state?.r;
  const navigate = useNavigate();

  console.log(location.state);

  const getPieData = () => {
    if (!passedResponses) return [];

    // Initialize counts with all available options set to 0
    const counts: Record<string, number> = {};
    passedQuestion?.options?.forEach((option: string) => {
      counts[option] = 0;
    });

    // Count actual responses
    passedResponses.forEach((r) => {
      const option = r.responseText;
      if (counts[option] !== undefined) {
        counts[option]++;
      }
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const generateColors = (count: number): string[] => {
    return Array.from({ length: count }, (_, i) => {
      const hue = (i * (360 / count)) % 360;
      return `hsl(${hue}, 70%, 50%)`;
    });
  };

  const pieData = getPieData();
  const dynamicColors = generateColors(pieData.length);

  return (
    <div className="p-4">
      <div>
        <button
          className="text-muted-foreground hover:text-primary mb-4 inline-block"
          onClick={() => navigate(-1)}
        >
          ← Takaisin
        </button>
      </div>
      <h2 className="scroll-m-20 text-center text-4xl font-semibold tracking-tight text-balance pb-5">
        Kootut vastaukset
      </h2>
      <p className="text-muted-foreground text-s pb-5">
        Kysymyskohtaisten vastausten koonti
      </p>
      <div className="w-full max-w-md mx-auto">
        <Card className="mx-auto p-4">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>{passedQuestion?.questionText}</FieldLabel>

                {/* TEXT ANSWERS */}
                {passedQuestion?.questionType === "text" && (
                  <Item variant="outline">
                    <ItemContent className="text-left">
                      {passedResponses?.map((r) => (
                        <ItemDescription key={r.responseId}>
                          • {r.responseText}
                        </ItemDescription>
                      ))}
                    </ItemContent>
                  </Item>
                )}

                {/* RADIO ANSWERS */}
                {passedQuestion?.questionType === "radioButton" && (
                  <div className="flex justify-center">
                    <PieChart width={400} height={400}>
                      <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label
                      >
                        {pieData.map((_, index) => (
                          <Cell key={index} fill={dynamicColors[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
        </Card>
      </div>
    </div>
  );
}

export default QuestionResultPage;
