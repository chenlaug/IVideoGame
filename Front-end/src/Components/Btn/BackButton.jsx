/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";

export default function BackButton({ label }) {
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = location.state && location.state.from;

  const handleClick = () => {
    if (previousLocation) {
      navigate(previousLocation);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      className="px-4 py-2 text-center font-medium text-light-TBleu bg-light-Yellow hover:bg-light-VCYellow border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
