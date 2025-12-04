import { Link } from "react-router-dom";

export default function MenuBar() {
  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-6 no-underline">
          <span className="text-xl font-bold">SurveyService</span>
          <span className="text-sm text-black-700 hover:underline">
            Kyselylista
          </span>
        </Link>
      </div>
    </div>
  );
}
