import PropTypes from "prop-types";

InputFile.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  currentCommentaire: PropTypes.object,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function InputFile({ label, id, required, onChange }) {
  return (
    <>
      <label
        htmlFor={id}
        className="mt-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  border-gray-300"
        type="file"
        id={id}
        name={id}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
