import { useState, useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [allowedNumber, setAllowedNumber] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (allowedNumber) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*-()_~{}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, allowedNumber, characterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=>{
passwordGenerator()
},[length, allowedNumber, characterAllowed, passwordGenerator])


  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 bg-opacity-60 backdrop-blur-xl 
                shadow-[0_0_25px_rgba(0,0,0,0.6)] rounded-3xl px-6 py-8 my-12 text-white border border-gray-700">

  <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-orange-400 to-yellow-300 
                 bg-clip-text text-transparent drop-shadow-lg">
    🔐 Password Generator
  </h1>

  {/* Input + Copy Button */}
  <div className="flex items-center bg-gray-800/70 rounded-2xl overflow-hidden mb-6 
                  shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-gray-700">
    <input 
      type="text"
      value={password}
      readOnly
      ref={passwordRef}
      className="w-full py-3 px-4 bg-transparent text-white text-lg placeholder-gray-400 
                 outline-none focus:ring-2 focus:ring-orange-400 transition-all"
      placeholder="Generated Password"
    />
    <button 
      onClick={copyPasswordToClipboard}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 
                 text-white px-5 py-3 font-semibold transition-all duration-300 cursor-pointer">
      Copy
    </button>
  </div>

  {/* Length Slider */}
  <div className="mb-5">
    <label className="block mb-2 text-gray-300 font-medium">
      Length: <span className="text-orange-400 font-bold">{length}</span>
    </label>
    <input 
      type="range"
      min={6}
      max={100}
      value={length}
      className="w-full accent-orange-500 cursor-pointer"
      onChange={(e) => setLength(e.target.value)}
    />
  </div>

  {/* Checkboxes */}
  <div className="flex flex-col gap-3 mb-6">
    <label className="flex items-center gap-3 bg-gray-800/70 p-3 rounded-xl cursor-pointer 
                      hover:bg-gray-700/60 transition-all border border-gray-700">
      <input 
        type="checkbox"
        defaultChecked={allowedNumber}
        className="w-5 h-5 accent-green-500"
        onChange={() => setAllowedNumber(prev => !prev)}
      />
      <span>Include Numbers</span>
    </label>

    <label className="flex items-center gap-3 bg-gray-800/70 p-3 rounded-xl cursor-pointer 
                      hover:bg-gray-700/60 transition-all border border-gray-700">
      <input 
        type="checkbox"
        defaultChecked={characterAllowed}
        className="w-5 h-5 accent-purple-500"
        onChange={() => setCharacterAllowed(prev => !prev)}
      />
      <span>Include Special Characters</span>
    </label>
  </div>

</div>

  )
}

export default App
