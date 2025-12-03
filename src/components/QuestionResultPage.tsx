import { useLocation, useNavigate } from "react-router-dom";
import type { Response } from "@/types";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Item, ItemContent, ItemDescription } from "./ui/item";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function QuestionResultPage() {
  const location = useLocation();
  const passedQuestion = location.state?.q;
  const passedResponses: Response[] = location.state?.r;
  const navigate = useNavigate();

  console.log(location.state);

  const getPieData = () => {
    if (!passedResponses) return [];

    const counts: Record<string, number> = {};

    passedResponses.forEach((r) => {
      const option = r.responseText;
      counts[option] = (counts[option] || 0) + 1;
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

      <div className="w-full max-w-md mx-auto">
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
                <PieChart width={300} height={300}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={dynamicColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
}

export default QuestionResultPage;
