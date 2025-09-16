import { use, useState } from "react";
import Input from "../../ui/Input";
import { QrContext } from "../../../store/qr-context";

const QrForm = () => {
  const { qrContext } = use(QrContext);
  const {
    width,
    height,
    data,
    margin,
    image,
    shape,
    withBg,
    borderRadius,
    qrOptions,
    imageOptions,
    dotsOptions,
    backgroundOptions,
    cornersSquareOptions,
    cornersDotOptions,
  } = qrContext;

  const { errorCorrectionLevel } = qrOptions;
  const { margin: imageMargin } = imageOptions;

  const { color: dotsColors, type: dotsType } = dotsOptions;
  const { color: backgroundColor } = backgroundOptions;
  const { color: cornerSquareColor, type: cornerSquareType } =
    cornersSquareOptions;
  const { color: cornerDotColor, type: cornerDotType } = cornersDotOptions;

  // State to track form validation
  const [formErrors, setFormErrors] = useState({});

  // Validation callback to track all field validations
  const handleValidation = (fieldId, isValid, errorMessage) => {
    setFormErrors((prev) => ({
      ...prev,
      [fieldId]: isValid ? null : errorMessage,
    }));
  };

  // Check if form has any errors
  const hasFormErrors = Object.values(formErrors).some(
    (error) => error !== null
  );

  return (
    <form action="" className="w-full flex flex-col gap-6">
      <Input
        label="Data to encode"
        id="data"
        placeholder="https://example.com"
        className="w-full"
        value={data}
        required={true}
        validationRules={{
          minLength: 1,
          maxLength: 2000,
          custom: (value) => {
            if (!value.trim()) return "Data to encode cannot be empty";
            return null;
          },
        }}
        onValidation={handleValidation}
      />

      <Input
        label="Enter Image your URL"
        id="image"
        type="url"
        placeholder="https://example.com"
        className="w-full"
        value={image}
        validationRules={{
          custom: (value) => {
            if (!value.trim()) return "Data to encode cannot be empty";
            return null;
          },
        }}
        onValidation={handleValidation}
      />

      <Input
        label="With Background Color"
        id={"backgroundOptions.color.checked"}
        className=""
        checked={withBg}
        type="checkbox"
        onValidation={handleValidation}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="color"
          label={!withBg ? "Transparent Background" : "Background Color:"}
          className={`w-full ${!withBg ? "opacity-50" : ""}`}
          value={backgroundColor}
          id={"backgroundOptions.color"}
          disabled={!withBg}
          required={withBg}
          onValidation={handleValidation}
        />

        <Input
          type="color"
          label={"Dots color:"}
          className={`w-full`}
          value={dotsColors}
          id={"dotsOptions.color"}
          required={true}
          onValidation={handleValidation}
        />

        <Input
          type="color"
          label={"Corners Square color:"}
          className={`w-full`}
          value={cornerSquareColor}
          id={"cornersSquareOptions.color"}
          required={true}
          onValidation={handleValidation}
        />

        <Input
          type="color"
          label={"Corners Eye color:"}
          className={`w-full`}
          value={cornerDotColor}
          id={"cornersDotOptions.color"}
          required={true}
          onValidation={handleValidation}
        />
      </div>

      <div className="flex justify-start">
        <Input
          id={`width`}
          label={`Width x Height (px)`}
          type="range"
          min={250}
          max={3000}
          value={width}
          className={`w-5/6 accent-emerald-600`}
          required={true}
          validationRules={{
            custom: (value) => {
              const numValue = parseInt(value);
              if (numValue < 250) return "Minimum size is 250px";
              if (numValue > 3000) return "Maximum size is 3000px";
              return null;
            },
          }}
          onValidation={handleValidation}
        />
        <div className="text-white text-2xl flex justify-center items-center bg-emerald-600 w-1/2">
          {width} * {height} px
        </div>
      </div>

      <div>
        <Input
          id={`image-margin`}
          label={`Image Margin (px)`}
          type="number"
          className={`w-3/5`}
          value={imageMargin}
          min={0}
          max={100}
          validationRules={{
            custom: (value) => {
              if (!value && value !== 0) return null; // Optional field
              const numValue = parseInt(value);
              if (isNaN(numValue)) return "Please enter a valid number";
              if (numValue < 0) return "Margin cannot be negative";
              if (numValue > 100) return "Maximum margin is 100px";
              return null;
            },
          }}
          onValidation={handleValidation}
        />
      </div>

      <div className="flex gap-4">
        <Input
          id={`margin`}
          label={`Margin (px)`}
          type="range"
          min={1}
          max={135}
          value={margin}
          className={`w-full accent-emerald-600`}
          required={true}
          validationRules={{
            custom: (value) => {
              const numValue = parseInt(value);
              if (numValue < 1) return "Minimum margin is 1px";
              if (numValue > 135) return "Maximum margin is 135px";
              return null;
            },
          }}
          onValidation={handleValidation}
        />

        <Input
          id={`borderRadius`}
          label={`Border radius (px)`}
          type="range"
          min={1}
          max={50}
          value={borderRadius}
          className={`w-full accent-emerald-600`}
          required={true}
          validationRules={{
            custom: (value) => {
              const numValue = parseInt(value);
              if (numValue < 1) return "Minimum border radius is 1px";
              if (numValue > 50) return "Maximum border radius is 50px";
              return null;
            },
          }}
          onValidation={handleValidation}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="select"
          id={`dotsOptions.type`}
          label={`Dot Style:`}
          value={dotsType}
          required={true}
          onValidation={handleValidation}
        >
          <option value="" className="text-gray-400">
            Select dot style
          </option>
          <option value="square" className="text-black">
            Square
          </option>
          <option value="dots" className="text-black">
            Dots
          </option>
          <option value="rounded" className="text-black">
            Rounded
          </option>
          <option value="classy" className="text-black">
            Classy
          </option>
          <option value="classy-rounded" className="text-black">
            Classy Rounded
          </option>
          <option value="extra-rounded" className="text-black">
            Extra Rounded
          </option>
        </Input>

        <Input
          type="select"
          id={`cornersSquareOptions.type`}
          label={`Corner Style:`}
          value={cornerSquareType}
          required={true}
          onValidation={handleValidation}
        >
          <option value="" className="text-gray-400">
            Select corner style
          </option>
          <option value="square" className="text-black">
            Square
          </option>
          <option value="rounded" className="text-black">
            Rounded
          </option>
          <option value="extra-rounded" className="text-black">
            Extra Rounded
          </option>
        </Input>

        <Input
          type="select"
          id={`cornersDotOptions.type`}
          label={`Eye Style:`}
          value={cornerDotType}
          required={true}
          onValidation={handleValidation}
        >
          <option value="" className="text-gray-400">
            Select eye style
          </option>
          <option value="square" className="text-black">
            Square
          </option>
          <option value="dot" className="text-black">
            Circle
          </option>
        </Input>

        <Input
          type="select"
          id={`qrOptions.errorCorrectionLevel`}
          label={`Error Correction Level:`}
          value={errorCorrectionLevel}
          required={true}
          onValidation={handleValidation}
        >
          <option value="" className="text-gray-400">
            Select error correction
          </option>
          <option value="L" className="text-black">
            Low
          </option>
          <option value="M" className="text-black">
            Medium
          </option>
          <option value="Q" className="text-black">
            Quality
          </option>
          <option value="H" className="text-black">
            High
          </option>
        </Input>

        <Input
          type="select"
          id={`shape`}
          label={`QR Code Shape:`}
          value={shape}
          required={true}
          onValidation={handleValidation}
        >
          <option value="" className="text-gray-400">
            Select shape
          </option>
          <option value="square" className="text-black">
            Square
          </option>
          <option value="circle" className="text-black">
            Circle
          </option>
        </Input>
      </div>

      {/* Optional: Form validation summary */}
      {hasFormErrors && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Please fix the following errors:
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {Object.entries(formErrors)
              .filter(([_, error]) => error !== null)
              .map(([fieldId, error]) => (
                <li key={fieldId}>• {error}</li>
              ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default QrForm;
