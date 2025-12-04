import { Link } from "react-router-dom";

export default function MenuBar() {
  return (
    <div className="w-full border-b bg-neutral-100">
      <div className="w-full flex items-center justify-between py-4 px-20">
        <Link to="/" className="flex items-end gap-10 no-underline">
          <span className="text-xl font-bold">SurveyService</span>
          <span className="text-l font-semibold hover:underline">Kyselyt</span>
        </Link>
      </div>
    </div>
  );
}
