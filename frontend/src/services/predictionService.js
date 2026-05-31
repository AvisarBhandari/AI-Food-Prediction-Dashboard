import axios from "axios";

const API_URL = "http://localhost:5000/api/predictions/";

const savePrediction = async (data, token) => {
  console.log("=== predictionService ===");

  console.log("Incoming data:", data);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("Headers:", config);

  const response = await axios.post(API_URL, data, config);

  console.log("API Response:", response);

  return response.data;
};
const getPredictions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const getAnalytics = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "analytics", config);

  return response.data;
};

export default {
  savePrediction,
  getPredictions,
  getAnalytics,
};
