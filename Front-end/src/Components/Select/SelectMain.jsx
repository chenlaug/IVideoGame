/* eslint-disable react/prop-types */

export default function SelectMain({
  label,
  id,
  onChange,
  value,
  options,
  placeholder,
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="mt-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        id={id}
        value={value}
        onChange={onChange}
        required
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}
