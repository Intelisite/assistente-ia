const axios = require('axios');

exports.handleChat = async (req, res) => {
  console.log("📥 Dados recebidos no backend:", req.body); // ✅ debug
  const { message, openai_key } = req.body;
  

  if (!message || !openai_key) {
    return res.status(400).json({ error: 'Chave de API ou mensagem ausente.' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${openai_key}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao processar a mensagem.' });
  }
};
