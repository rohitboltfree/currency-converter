import { useState } from 'react'
// import { InputBox } from './components/InputBox'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

// import './App.css'

function App() {
  
  const [amount , setAmount] = useState(0)
  const [from , setFrom] = useState("inr")
  const [to, setTo] = useState("usd")
  const [convertedAmount, setConvertedAmount]= useState(0)

  const currencyInfo = useCurrencyInfo(from) // use to access custom hook
  const option = Object.keys(currencyInfo)// use to access only the key of any currency not value 

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const getCurrency=()=>{
    
  }

  const convert= () => {
    console.log(currencyInfo,to,currencyInfo[to])
    console.log()
       setConvertedAmount( amount * currencyInfo[to] ) 
  }

  return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
              //url('https://c4.wallpaperflare.com/wallpaper/163/392/912/map-wold-map-technology-world-wallpaper-preview.jpg')
                backgroundImage: `url('https://images.pexels.com/photos/7485787/pexels-photo-7485787.jpeg?auto=compress&cs=tinysrgb&w=600')`
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={option}
                                onCurrencyChange={ (currency) =>{
                                    console.log(currency)
                                    setFrom("currency",currency)
                                }}
                                selectCurrency={from}
                                onAmountChange={ (amount) => {
                                    console.log("amount",amount)
                                  setAmount(amount)
                                }}    
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={option}
                                onCurrencyChange={ (currency) => setTo(currency)}
                                selectCurrency='to'
                                amountDisabled
                                
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {to.toUpperCase()} to {from.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App
