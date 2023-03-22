import axios from 'axios';

export default async function handler(req, res) {
  const { prompt, max_tokens } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/completions';

  try {
    const response = await axios.post(apiUrl, {
      model: "text-davinci-003",
      prompt,
      temperature: 0.5,
      max_tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
 /*        'User-Agent': 'My Application/1.0' */
      }
    });

    const generatedText = response.data.choices[0].text;
    const usage = response.data.usage;
    res.status(200).json({ text: generatedText });
    console.log('usage:', usage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
  
};