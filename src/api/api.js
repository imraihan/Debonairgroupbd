import axios from 'axios';
const API_URL = 'http://59.152.62.177:8085/api';

export const fetchDivisions = async () => {
  try {
    const response = await axios.get(`${API_URL}/Employee/Division`);

    if (response.data && response.data.isSuccess) {
      return response.data.readDivisionData; 
    } else {
      throw new Error("Error fetching divisions: Invalid response");
    }
  } catch (error) {
    console.log("Error fetching divisions:", error);
    throw error;
  }
};

  export const fetchDistricts = async (divisionId) => {
    try {
      const response = await axios.get(`${API_URL}/Employee/District/${divisionId}`);
  
      if (response.data && response.data.isSuccess) {
        return response.data.readDistrictData;
      } else {
        throw new Error("Error fetching districts: Invalid response");
      }
    } catch (error) {
      console.log("Error fetching districts:", error);
      throw error;
    }
  };

