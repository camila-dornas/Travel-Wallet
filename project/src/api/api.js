const axios = require('axios');
require('dotenv').config();

const {API_KEY} = process.env;


const getCurrency = async (currency) => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);

    const array = response.data.supported_codes
        .reduce((list, sub) => list.concat(sub), []);
    return array;
  } catch (error) {
    throw error;
  }
};

const convertCurrency = async (from, to, amount) => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getCurrency,
  convertCurrency,
};
