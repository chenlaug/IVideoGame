import PropTypes from "prop-types";

TextareaMain.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default function TextareaMain({
  label,
  id,
  onChange,
  value,
  placeholder,
}) {
  return (
    <>
      <label
        className="block text-light-TBlack dark:text-dark-TWhite text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className=" appearance-none border rounded w-full py-2 px-3 text-light-White dark:text-dark-TWhite shadow-sm bg-light-VCBlackGray dark:bg-dark-VCBlack leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
}
