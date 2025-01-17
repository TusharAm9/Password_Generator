import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [incNumbers, setIncNumbers] = useState(false);
  const [incSymbols, setIncSymbols] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let temp = "";
    let chr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (incNumbers) chr += "0123456789";
    if (incSymbols) chr += "!@#$%^&*()_+";

    for (let i = 1; i <= passwordLength; i++) {
      const x = Math.floor(Math.random() * chr.length);
      temp += chr.charAt(x);
    }
    setPassword(temp);
  }, [passwordLength, incNumbers, incSymbols, setPassword]);

  const CopyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword, passwordLength, incNumbers, incSymbols]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-600 bg-gray-600">
        <h2 className="text-white text-center">Password Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="outline-none w-full py-1 px-3"
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-sky-600"
            onClick={CopyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={50}
              value={passwordLength}
              className="cursor-pointer"
              onChange={(e) => setPasswordLength(e.target.value)}
            />
            <label htmlFor="passwordLength">Length : {passwordLength}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={incNumbers}
              id="incNumbers"
              onChange={() => {
                setIncNumbers((prev) => !prev);
              }}
            />
            <label htmlFor="incNumbers">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={incSymbols}
              id="incSymbols"
              onChange={() => {
                setIncSymbols((prev) => !prev);
              }}
            />
            <label htmlFor="incSymbols">Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
