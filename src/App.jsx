import QrComponent from "./components/qrComponents/QrComponent";
import QrContextProvider from "./store/qr-context";

const App = () => {
  return (
    <>
      <QrContextProvider>
        <main className="w-full py-20 flex justify-center items-center relative">
          <QrComponent />
        </main>
      </QrContextProvider>
    </>
  );
};

export default App;
