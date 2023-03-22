import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    const openaiApiKey = process.env.OPENAI_API_KEY;
    const openaiApiUrl = 'https://api.openai.com/v1/images/generations';

    try {
      const response = await axios.post(
        openaiApiUrl,
// size in 256x256, 512x512, or 1024x1024 pixels
        {
          prompt,
          // Adjust the parameters as needed
          model: 'image-alpha-001',
          num_images,
          size: '256x256',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      if (error.response) {
        console.log('Error status:', error.response.status);
        console.log('Error data:', error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.log('Error message:', error.message);
        res.status(500).json({ message: 'Error generating image:'});
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
