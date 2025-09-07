import { use, useState } from "react";
import { QrContext } from "../../../store/qr-context";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";

const qrCode = new QRCodeStyling();

const QrCode = () => {
  const { qrContext } = use(QrContext);
  const qrCodeRef = useRef();
  const [qrBorderRadius, setQrBorderRadius] = useState(qrContext.borderRadius);

  useEffect(() => {
    setQrBorderRadius(qrContext.borderRadius);
    qrCode.update(qrContext);
  }, [qrContext]);

  useEffect(() => {
    qrCode.append(qrCodeRef.current);
  }, []);

  return (
    <div
      className={`lg:sticky top-36 w-3xs aspect-square flex justify-center items-center rounded-[${qrBorderRadius}px] overflow-hidden`}
    >
      <div
        ref={qrCodeRef}
        className="w-full h-full [&>canvas]:w-full [&>canvas]:h-full"
      ></div>
    </div>
  );
};

export default QrCode;
