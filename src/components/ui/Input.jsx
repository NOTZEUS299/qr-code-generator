import { use, useRef } from "react";
import { QrContext } from "../../store/qr-context";

const Input = ({ label, id, className, type = "text", children, ...props }) => {
  const { handleBasicChanges, handleSubChanges } = use(QrContext);
  const debounceRef = useRef(null);

  const flexDirection =
    type === "text"
      ? "flex-col justify-center"
      : "flex-row items-center justify-start";
  const checkboxClass = type === "checkbox" ? "w-5 h-5 accent-emerald-700" : "";
  const colorPickerLabelClass = type === "color" ? "text-sm w-full" : "";
  const colorPickerClass =
    type === "color"
      ? "w-[70px] h-[70px] p-0"
      : "bg-white/90 border-emerald-600 border-2 text-[#232323] rounded-lg";

  let isSelect = false;

  if (type === "select") {
    isSelect = true;
  }

  const topLevelKeys = [
    "width",
    "height",
    "data",
    "margin",
    "image",
    "shape",
    "borderRadius",
  ];

  const isNumber = ["width", "height"];

  const handleOnChange = (value) => {
    if (topLevelKeys.includes(id)) {
      isNumber.includes(id)
        ? handleBasicChanges(id, +value)
        : handleBasicChanges(id, value);
    } else {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        const [key, subkey] = id.split(".");
        if (type === "checkbox") {
          handleBasicChanges("withBg", value);
          handleSubChanges(key, subkey, "");
        }
        handleSubChanges(key, subkey, value);
      }, 500);
    }
  };

  return (
    <>
      {isSelect ? (
        <span className="flex flex-col gap-2 w-full">
          <label
            htmlFor={id}
            className={`flex gap-2 text-[#232323] font-medium ${colorPickerLabelClass}`}
          >
            {label}
          </label>
          <select
            onChange={(event) => handleOnChange(event.target.value)}
            name={id}
            id={id}
            className={`text-black p-3 focus:outline-none bg-white/90 border-emerald-600 border-2 text-[#232323] rounded-lg ${className}`}
            {...props}
          >
            {children}
          </select>
        </span>
      ) : (
        <span className={`flex ${flexDirection} gap-2 w-full`}>
          <label
            htmlFor={id}
            className={`flex gap-2 text-[#232323] font-medium ${colorPickerLabelClass}`}
          >
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={id}
            onChange={(event) =>
              handleOnChange(
                type === "checkbox" ? event.target.checked : event.target.value
              )
            }
            className={`${checkboxClass} ${colorPickerClass} p-3 focus:outline-none ${className}`}
            {...props}
          >
            {children}
          </input>
        </span>
      )}
    </>
  );
};

export default Input;
