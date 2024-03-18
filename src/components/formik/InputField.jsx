const InputField = ({
  title,
  name,
  placeHolder,
  handleChange,
  handleBlur,
  value,
  errors,
  touched,
  type = "text",
}) => {
  return (
    <div>
      <label htmlFor="" className="text-base font-medium text-gray-900">
        {title}
      </label>
      <div className="mt-2">
        <input
          className={`flex h-10 w-full rounded-md border ${
            touched && errors
              ? " border-red-300 placeholder:text-red-400"
              : "border-gray-300 placeholder:text-gray-400"
          }  bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
          type={type}
          placeholder={placeHolder}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
      </div>

      {touched && errors && (
        <div className=" text-red-500 text-sm ml-2 mt-1">{errors}</div>
      )}
    </div>
  );
};

export default InputField;
