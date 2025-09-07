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
  // const [withBg, setWithBg] = useState(true);

  return (
    <form action="" className="w-full flex flex-col gap-6">
      <Input
        label="Data to encode"
        id="data"
        placeholder="https://example.com"
        className="w-full"
        value={data}
      />
      <Input
        label="Enter Image your URL"
        id="image"
        placeholder="https://example.com"
        className="w-full"
        value={image}
      />
      <Input
        label="With Background Color"
        id={"backgroundOptions.color.checked"}
        placeholder="https://example.com/bg-image.jpg"
        className=""
        checked={withBg}
        type="checkbox"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="color"
          label={!withBg ? "Transparent Background" : "Backgroun Color:"}
          className={`w-full ${!withBg ? "opacity-0" : null}`}
          value={backgroundColor}
          id={"backgroundOptions.color"}
          disabled={!withBg}
        />
        <Input
          type="color"
          label={"Dots color:"}
          className={`w-full`}
          value={dotsColors}
          id={"dotsOptions.color"}
        />
        <Input
          type="color"
          label={"Corners Square color:"}
          className={`w-full`}
          value={cornerSquareColor}
          id={"cornersSquareOptions.color"}
        />
        <Input
          type="color"
          label={"Corners Eye color:"}
          className={`w-full`}
          value={cornerDotColor}
          id={"cornersDotOptions.color"}
        />
      </div>
      <div className="flex gap-4">
        <Input
          id={`width`}
          label={`Width (px)`}
          className={`w-3/5`}
          value={width}
        />
        <Input
          id={`height`}
          label={`Height (px)`}
          className={`w-3/5`}
          value={height}
        />
        <Input
          id={`borderRadius`}
          label={`Border radius (px)`}
          className={`w-3/5`}
          value={borderRadius}
        />
      </div>
      <div className="flex gap-4">
        <Input
          id={`margin`}
          label={`Margin (px)`}
          className={`w-full`}
          value={margin}
        />
        <Input
          id={`image-margin`}
          label={`Image Margin (px)`}
          className={`w-full`}
          value={imageMargin}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="select"
          id={`dotsOptions.type`}
          label={`Dot Style:`}
          value={dotsType}
        >
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
        >
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
        >
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
        >
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
          label={`Qr Code Shape:`}
          value={shape}
        >
          <option value="square" className="text-black">
            Square
          </option>
          <option value="circle" className="text-black">
            Circle
          </option>
        </Input>
      </div>
    </form>
  );
};

export default QrForm;
