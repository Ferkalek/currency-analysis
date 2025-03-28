import axios from "axios";
import { CurrencyItem, ResponseType } from "../models";

export const fetchCurrencyItem = async (item: CurrencyItem): Promise<ResponseType> => {
    try {
        const response = await axios.get(`https://api.investing.com/api/financialdata/technical/analysis/${item.value}/1m`);
        return {
        ...response,
        error: undefined,
        currencyLabel: undefined
        } as ResponseType;
    } catch (error) {
        console.error(`Error fetching data for item ${item.value}:`, error);
        throw error;
    }
};

// 2nd variant 
//   const requests = currencyList.map(currency => 
//     axios.get(`https://api.investing.com/api/financialdata/technical/analysis/${currency.value}/1m`)
//     .then(response => {
//       return {
//         ...response,
//         error: undefined,
//         currencyLabel: undefined
//       } as ResponseType;
//     })
//     .catch(error => {
//       console.error(`Error fetching data for ${currency.label}:`, error);
//       return { 
//         data: null,
//         error: true,
//         currencyLabel: currency.label
//       } as ResponseType;
//     })
// );

// const responses: ResponseType[] = await Promise.all(requests);
