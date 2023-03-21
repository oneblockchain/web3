import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateImage = async (prompt: string) => {
  try {
    const response = await apiClient.post('/api/generate-image', { prompt });
    return response.data;
  } catch (error) {
    throw new Error('Error generating image');
  }
};
