import { useContext, useState } from "react";
import QrComponent from "./components/qrComponents/QrComponent";

const App = () => {
  const [rowCol, setRowCow] = useState({ row: 5, col: 5 });
  const numberOfElem = rowCol.row * rowCol.col;

  return (
    <div className={`p-5`}>
      <main className="w-full py-20 flex justify-center items-center relative">
        <QrComponent />
      </main>
      {/* <div className={`grid gap-2.5`} style={{ gridTemplateColumns: `repeat(${rowCol.col}, 1fr)` }}>
        {Array.from({ length: numberOfElem }).map((x, i) => {
          return (
            <div className={`w-full bg-emerald-600 rounded-4xl flex justify-center items-center`} style={{ height: `${94 / rowCol.row}vh` }}>{i}</div>
          )
        })}
      </div> */}
    </div>
  );
};

export default App;
