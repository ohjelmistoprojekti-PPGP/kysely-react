import { Link } from "react-router-dom";

export default function MenuBar() {
  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-5xl flex items-center justify-between py-3">
        <Link to="/" className="flex items-end gap-10 no-underline">
          <span className="text-3xl font-bold">SurveyService</span>
          <span className="text-xl font-semibold hover:underline">Kyselyt</span>
        </Link>
      </div>
    </div>
  );
}
