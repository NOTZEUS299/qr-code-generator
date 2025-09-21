import { use, useEffect, useRef, useState } from "react";
import { QrContext } from "../../../store/qr-context";
import QRCodeStyling from "qr-code-styling";
import { generateColorPalettes } from "../../../utils/palette";

const QrCode = () => {
  const { qrContext } = use(QrContext);
  const [qrInstances, setQrInstances] = useState([]);
  const qrRefs = useRef([]);
  const { backgroundOptions } = qrContext

  const [qrBorderRadius, setQrBorderRadius] = useState(qrContext.borderRadius);

  // Generate palettes (example: 5)
  const palettes = generateColorPalettes(backgroundOptions.color, 500);
  console.log(palettes)
  useEffect(() => {
    // Create one QR instance per palette
    const instances = palettes.map(() => new QRCodeStyling());
    setQrInstances(instances);
  }, []);

  useEffect(() => {
    // Append canvases once instances exist
    qrInstances.forEach((qr, idx) => {
      if (qrRefs.current[idx] && !qrRefs.current[idx].hasChildNodes()) {
        qr.append(qrRefs.current[idx]);
      }
    });
  }, [qrInstances]);

  useEffect(() => {
    // Update each QR with context + palette colors
    qrInstances.forEach((qr, idx) => {
      const palette = palettes[idx];
      qr.update({
        ...qrContext,
        dotsOptions: {
          ...qrContext.dotsOptions,
          color: palette.data,
        },
        cornersSquareOptions: {
          ...qrContext.cornersSquareOptions,
          color: palette.square,
        },
        cornersDotOptions: {
          ...qrContext.cornersDotOptions,
          color: palette.eye,
        },
        backgroundOptions: {
          ...qrContext.backgroundOptions,
          color: palette.background,
        }
      });
    });
    setQrBorderRadius(qrContext.borderRadius);
  }, [qrContext, qrInstances]);

  const qrBorderRadiusClass = `rounded-[${qrBorderRadius}px]`;

  return (
    <div className="flex flex-wrap justify-center items-center gap-6">
      {palettes.map((_, idx) => (
        <div
          key={idx}
          className={`w-48 aspect-square flex justify-center items-center overflow-hidden ${qrBorderRadiusClass}`}
          style={{ borderRadius: `${qrBorderRadius}%` }}
        >
          <div
            ref={(el) => (qrRefs.current[idx] = el)}
            className="w-full h-full [&>canvas]:w-full [&>canvas]:h-full"
          ></div>
        </div>
      ))}
    </div>
  );
};

export default QrCode;