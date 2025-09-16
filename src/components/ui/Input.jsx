import { use, useRef, useState, useEffect } from "react";
import { QrContext } from "../../store/qr-context";

const Input = ({
  label,
  id,
  className = "",
  type = "text",
  children,
  required = false,
  min,
  max,
  pattern,
  validationRules = {},
  onValidation,
  ...props
}) => {
  const { handleBasicChanges, handleSubChanges } = use(QrContext);
  const debounceRef = useRef(null);
  const [error, setError] = useState("");
  const [value, setValue] = useState(props.value || props.defaultValue || "");

  const defaultValidationRules = {
    required: required,
    min: min,
    max: max,
    pattern: pattern,
    ...validationRules,
  };

  const validateInput = (inputValue, inputType = type) => {
    const rules = defaultValidationRules;
    let errorMessage = "";

    if (rules.required && (!inputValue || inputValue === "")) {
      errorMessage = `${label} is required`;
      return errorMessage;
    }

    if (!inputValue && !rules.required) {
      return "";
    }

    switch (inputType) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
          errorMessage = "Please enter a valid email address";
        }
        break;

      case "url":
        // try {
        //   // new URL(inputValue);
        // } catch {
        //   // errorMessage = "Please enter a valid URL";
        // }
        break;

      case "number":
      case "range":
        const numValue = parseFloat(inputValue);
        if (isNaN(numValue)) {
          errorMessage = "Please enter a valid number";
        } else {
          if (rules.min !== undefined && numValue < rules.min) {
            errorMessage = `Value must be at least ${rules.min}`;
          } else if (rules.max !== undefined && numValue > rules.max) {
            errorMessage = `Value must be no more than ${rules.max}`;
          }
        }
        break;

      case "text":
        if (rules.minLength && inputValue.length < rules.minLength) {
          errorMessage = `${label} must be at least ${rules.minLength} characters`;
        } else if (rules.maxLength && inputValue.length > rules.maxLength) {
          errorMessage = `${label} must be no more than ${rules.maxLength} characters`;
        }
        break;
    }

    if (rules.pattern && inputValue) {
      const regex = new RegExp(rules.pattern);
      if (!regex.test(inputValue)) {
        errorMessage = rules.patternMessage || `${label} format is invalid`;
      }
    }

    if (rules.custom && typeof rules.custom === "function") {
      const customError = rules.custom(inputValue);
      if (customError) {
        errorMessage = customError;
      }
    }

    return errorMessage;
  };

  useEffect(() => {
    if (value !== "") {
      const errorMessage = validateInput(value);
      setError(errorMessage);
      if (onValidation) {
        onValidation(id, !errorMessage, errorMessage);
      }
    }
  }, [value]);

  const flexDirection =
    type === "text"
      ? "flex-col justify-center"
      : "flex-row items-center justify-start";
  const checkboxClass = type === "checkbox" ? "w-5 h-5 accent-emerald-700" : "";
  const colorPickerLabelClass = type === "color" ? "text-sm w-full" : "";
  const colorPickerClass =
    type === "color"
      ? "w-[70px] h-[70px] p-0 border-emerald-600 border-3 rounded-lg"
      : "bg-white/90 border-emerald-600 p-3 border-2 text-[#232323] rounded-lg";

  const errorClass = error ? "border-red-500 bg-red-50" : "";
  const inputClassName = `${checkboxClass} ${colorPickerClass} ${errorClass} focus:outline-none ${className}`;

  let content = (
    <div className={`flex ${flexDirection}`}>
      <label
        htmlFor={id}
        className={`flex gap-2 text-[#232323] font-medium ${colorPickerLabelClass} ${
          required ? "after:content-[''] after:text-red-500 after:ml-1" : ""
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={type === "checkbox" ? undefined : value}
        checked={type === "checkbox" ? value : undefined}
        onChange={(event) => {
          const newValue =
            type === "checkbox" ? event.target.checked : event.target.value;
          setValue(newValue);
          handleOnChange(newValue);
        }}
        onBlur={(event) => {
          const newValue =
            type === "checkbox" ? event.target.checked : event.target.value;
          const errorMessage = validateInput(newValue);
          setError(errorMessage);
          if (onValidation) {
            onValidation(id, !errorMessage, errorMessage);
          }
        }}
        className={inputClassName}
        min={min}
        max={max}
        pattern={pattern}
        required={required}
        {...props}
      >
        {children}
      </input>
      {error && (
        <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </span>
      )}
    </div>
  );

  if (type === "select") {
    content = (
      <span className="flex flex-col gap-2 w-full">
        <label
          htmlFor={id}
          className={`flex gap-2 text-[#232323] font-medium ${colorPickerLabelClass} ${
            required ? "after:content-['*'] after:text-red-500 after:ml-1" : ""
          }`}
        >
          {label}
        </label>
        <select
          onChange={(event) => {
            const newValue = event.target.value;
            setValue(newValue);
            handleOnChange(newValue);
          }}
          onBlur={(event) => {
            const newValue = event.target.value;
            const errorMessage = validateInput(newValue);
            setError(errorMessage);
            if (onValidation) {
              onValidation(id, !errorMessage, errorMessage);
            }
          }}
          value={value}
          name={id}
          id={id}
          className={`text-black p-3 focus:outline-none bg-white/90 border-emerald-600 border-2 text-[#232323] rounded-lg ${errorClass} ${className}`}
          required={required}
          {...props}
        >
          {children}
        </select>
        {error && (
          <span className="text-red-500 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </span>
        )}
      </span>
    );
  }

  if (type === "range") {
    content = (
      <div className="flex flex-col w-full">
        <label
          htmlFor={id}
          className={`flex gap-2 text-[#232323] font-medium ${colorPickerLabelClass} ${
            required ? "after:content-['*'] after:text-red-500 after:ml-1" : ""
          }`}
        >
          {label}
        </label>
        <div className="flex items-center gap-2 mt-2.5">
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            className={`focus:outline-none flex-1 ${className}`}
            onChange={(event) => {
              const newValue = event.target.value;
              setValue(newValue);
              handleOnChange(newValue);
            }}
            onBlur={(event) => {
              const newValue = event.target.value;
              const errorMessage = validateInput(newValue);
              setError(errorMessage);
              if (onValidation) {
                onValidation(id, !errorMessage, errorMessage);
              }
            }}
            min={min}
            max={max}
            required={required}
            {...props}
          >
            {children}
          </input>
          <span className="text-sm text-gray-600 min-w-[3rem] text-right">
            {value}
          </span>
        </div>
        {error && (
          <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </span>
        )}
      </div>
    );
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

  const handleAspectChange = (inputValue) => {
    const errorMessage = validateInput(inputValue, "number");
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue > 0) {
      handleBasicChanges(`width`, numValue);
      handleBasicChanges(`height`, numValue);
    }
  };

  const handleOnChange = (inputValue) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;

      const errorMessage = validateInput(inputValue);
      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      try {
        if (topLevelKeys.includes(id)) {
          if (isNumber.includes(id)) {
            handleAspectChange(inputValue);
          } else {
            handleBasicChanges(id, inputValue);
          }
        } else {
          const [key, subkey] = id.split(".");
          if (!key || !subkey) {
            console.warn(
              `Invalid id format: ${id}. Expected format: "key.subkey"`
            );
            return;
          }

          if (type === "checkbox") {
            handleBasicChanges("withBg", inputValue);
            handleSubChanges(key, subkey, "");
          } else {
            handleSubChanges(key, subkey, inputValue);
          }
        }
      } catch (error) {
        console.error("Error processing input change:", error);
        setError("An error occurred while processing the input");
      }
    }, 500);
  };

  return content;
};

export default Input;
