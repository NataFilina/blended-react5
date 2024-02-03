import axios from "axios";

axios.defaults.baseURL = "https://api.opencagedata.com/geocode/v1/json";
const API_KEY = "c34efdc8ec4d43dfa0a3980567efbefd";

export const userInfo = async ({ latitude, longitude }) => {
  try {
    const { data } = await axios.get(
      `?q=${latitude}+${longitude}&key=${API_KEY}`
    );
    return data.results[0].annotations.currency.iso_code;
  } catch (error) {
    console.log("error");
  }
};
