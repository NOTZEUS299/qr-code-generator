import QrForm from "./QrForm";

const QrAttribute = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:items-start gap-6 px-4 lg:px-0 max-w-lg text-white">
      <h1 className="text-4xl font-bold text-black text-center lg:text-left">
        QR Code Generator
      </h1>
      <p className="text-gray-400 text-center lg:text-left">
        Create your own QR code for free. Generate QR codes for URLs, vCards,
        WiFi, and more. Customize your QR code with colors and logos to make it
        unique.
      </p>
      <QrForm />
    </div>
  );
};

export default QrAttribute;
