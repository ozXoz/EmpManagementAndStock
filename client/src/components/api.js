import axios from 'axios';

export const fetchUserProductTypes = async (authToken) => {
  try {
    const response = await axios.get('http://localhost:3001/api/users/product-types', {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
