import { useEffect, useState } from "react";
function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  useEffect(() => {
    console.log("API called"),currency;
    //  getCurrencies();
    if (!currency) {
      throw "does not have currency";
    }
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.5.2/v1/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data[currency]);
      });
  }, [currency]);

  console.log(data);
  return data;
}

export default useCurrencyInfo;
