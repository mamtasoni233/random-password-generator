import { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  lowerCasedAlphabets,
  numbers,
  symbol,
  upperCasedAlphabets,
} from './Data/passChar';

function App() {
  let [upperCase, setUppercase] = useState(false);
  let [lowerCase, setLowercase] = useState(false);
  let [number, setNumber] = useState(false);
  let [symbols, setSymbols] = useState(false);
  let [passlength, setPasslength] = useState(10);
  let [fpass, setFpass] = useState('');

  let createPassword = (e) => {
    let finalPass = '';
    let charSet = '';
    e.preventDefault();
    if (upperCase || lowerCase || number || symbols) {
      if (upperCase) charSet += upperCasedAlphabets;
      if (lowerCase) charSet += lowerCasedAlphabets;
      if (number) charSet += numbers;
      if (symbols) charSet += symbol;
      for (let i = 0; i < passlength; i++) {
        finalPass += charSet.charAt(Math.floor(Math.random() * charSet.length));
        setFpass(finalPass);
      }
    } else {
      toast.error('Please select at least one checkbox value...!');
      // alert('Please select at least one checkbox value...!');
    }
  };
  let copyPass = async () => {
    if (fpass.length > 0) {
      console.log(fpass);
      setTimeout(() => {
        navigator.clipboard.writeText(fpass);
      }, 500);
      toast.success('Password copied to clipboard...!');
    } else {
      toast.error('Please generate password first...!');
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <h1 className="heading">Random Password Generator</h1>
        <form id="passwordForm">
          <p className="length">Current Length:</p>
          <div className="flex">
            <input
              type="text"
              className="generated-pass"
              readOnly
              value={fpass}
            />
            <button
              type="button"
              id="copyBtn"
              className="copyBtn"
              onClick={copyPass}
            >
              Copy Password
            </button>
          </div>
          <div className="flex">
            {/* <p>10</p> */}
            {/* <input id="length" type="range" min={10} max={40} /> */}
            {/* <p>40</p> */}
            <p>Length</p>
            <input
              className=""
              id="length"
              type="number"
              min={10}
              max={20}
              value={passlength}
              onChange={(e) => setPasslength(e.target.value)}
            />
          </div>
          <div className="flex">
            <label htmlFor="includeUpperCase">Include Uppercase </label>
            <input
              id="includeUpperCase"
              type="checkbox"
              checked={upperCase}
              onChange={() => setUppercase(!upperCase)}
            />
          </div>
          <div className="flex">
            <label htmlFor="includeLowerCase">Include LowerCase </label>
            <input
              id="includeLowerCase"
              type="checkbox"
              checked={lowerCase}
              onChange={() => setLowercase(!lowerCase)}
            />
          </div>
          <div className="flex">
            <label htmlFor="includeNumber">Include Number</label>
            <input
              id="includeNumber"
              type="checkbox"
              checked={number}
              onChange={() => setNumber(!number)}
            />
          </div>
          <div className="flex">
            <label htmlFor="includeSymbols">Include Symbols </label>
            <input
              id="includeSymbols"
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />
          </div>
          <button type="submit" onClick={createPassword}>
            Generate Password
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
