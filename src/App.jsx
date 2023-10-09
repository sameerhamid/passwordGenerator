import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charectersAllowed, setCharectersAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charectersAllowed) str += "@#$_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charectersAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charectersAllowed, passwordGenerator]);

  const copyPasswordClipborard = useCallback(() => {
    passwordRef?.current?.select();
    passwordRef?.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [password]);

  return (
    <>
      <div className="main_container">
        <h2>Password Generator</h2>
        <div className="text_btn">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            ref={passwordRef}
          />
          <button onClick={copyPasswordClipborard}>Copy</button>
        </div>
        <div className="range_checkbox">
          <div>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={charectersAllowed}
              id="charInput"
              onChange={() => setCharectersAllowed(!charectersAllowed)}
            />
            <label htmlFor="charInput">Cherecters</label>
          </div>
        </div>
        {isCopied ? <div className="copy">Copied to clipboard</div> : null}
      </div>
    </>
  );
}

export default App;
