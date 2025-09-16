import QrCode from "./subComponents/QrCode";
import QrAttribute from "./subComponents/QrAttribute";

const QrComponent = () => {
  return (
    <main className="w-full 2xl:w-4/5 flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start gap-40 mx-auto gap-8">
      <QrAttribute />
      <QrCode />
    </main>
  );
};

export default QrComponent;
