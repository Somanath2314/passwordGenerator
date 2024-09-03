import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passGnererator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += ":!@#$%^&*(),";
    for (let i = 0; i <= length; i++)
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passGnererator();
  }, [length, numberAllowed, charAllowed]);

  function handleSubmit(params) {
    passwordRef.current?.select();
    //will be copied to the clipBoard
    window.navigator.clipboard.writeText(password)
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-orange-400 mb-4 text-center">
          Password Generator
        </h1>
        <div className="mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            ref={passwordRef}
            readOnly
            className="w-full p-2 bg-gray-700 text-white rounded-md outline-none"
          />
          <button onClick={handleSubmit} className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-colors duration-200">
            Copy
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Length: {length}</label>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="mr-2"
          />
          <label>Number Allowed</label>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="mr-2"
          />
          <label>Character Allowed</label>
        </div>
      </div>
    </div>
  );
}

export default App;
