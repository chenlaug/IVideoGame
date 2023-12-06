import PropTypes from "prop-types";

InputMain.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  currentCommentaire: PropTypes.object,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
};

export default function InputMain({
  value,
  onChange,
  type,
  label,
  placeholder,
  id,
  max,
  min,
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="mt-2 block text-sm font-medium text-light-TBlack dark:text-dark-TWhite"
      >
        {label}
      </label>
      <input
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-light-White dark:text-dark-TWhite shadow-sm bg-light-VCBlackGray dark:bg-dark-VCBlack border-gray-300 rounded-md"
        id={id}
        type={type}
        max={max}
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </>
  );
}
