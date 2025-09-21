import QrCode from "./subComponents/QrCode";
import QrAttribute from "./subComponents/QrAttribute";
import { useContext } from "react";
import { QrContext } from "../../store/qr-context";

const QrComponent = () => {
  const { qrContext } = useContext(QrContext)
  const { backgroundOptions } = qrContext
  return (
    <main className="w-full 2xl:w-4/5 flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start gap-40 mx-auto gap-8">
      <QrAttribute />
      <div className={`p-5 flex justify-center items-center rounded-4xl`} style={{ background: backgroundOptions.color }}>
        <QrCode />
      </div>
    </main>
  );
};

export default QrComponent;
