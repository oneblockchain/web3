import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    const openaiApiKey = process.env.OPENAI_API_KEY;
    const openaiApiUrl = 'https://api.openai.com/v1/images/generations';

    try {
      const response = await axios.post(
        openaiApiUrl,
        {
          prompt,
          // Adjust the parameters as needed
          model: 'image-alpha-001',
          num_images: 1,
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
      res.status(500).json({ message: 'Error generating image' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
