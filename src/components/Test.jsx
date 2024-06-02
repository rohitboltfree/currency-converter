import { useEffect, useState } from 'react'
import { InputBox } from './index'

function Test() {

    const [currencyType,setCurrencyType] = useState([]);
    const [fromCurrency,setFromCurrency] = useState("inr");
    const [toCurrency, setToCurrency] = useState("usd")
    const [amount , setAmount] = useState(0)
    const [convertedAmount, setConvertedAmount]= useState(0)

  useEffect(()=>{
    fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.5.2/v1/currencies/${currencyType["inr"]??"inr"}.json`
      )
        .then((res) => res.json())
        .then((res) => {
            const data = res[currencyType["inr"]??"inr"];;
            if(data){
                setCurrencyType(Object.keys(data));
            }
        });
  },[]);

  const swap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const getCurrency=()=>{
    fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.5.2/v1/currencies/${fromCurrency}.json`
      )
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            const data = res[fromCurrency][toCurrency]
            
            setConvertedAmount(()=>amount * data)
        });
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
                            getCurrency()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={currencyType}
                                onCurrencyChange={ (currency) =>{
                                    // console.log(currency)
                                    setFromCurrency(currency)
                                }}
                                selectCurrency={fromCurrency}
                                onAmountChange={ (amount) => {
                                    // console.log("amount",amount)
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
                                currencyOptions={currencyType}
                                // onAmountChange={(amount)=>{
                                //     setConvertedAmount(amount)
                                // }}
                                onCurrencyChange={ (currency) => setToCurrency(currency)}
                                selectCurrency={toCurrency}
                                amountDisabled
                                
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Test
