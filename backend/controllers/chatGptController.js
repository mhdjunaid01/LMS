import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const USE_MOCK = true;
//gpt-3.5-turbo

// const chatWithGPT = async (req, res) => {
//   const { message } = req.body;

 
//     if (USE_MOCK) {
//       const mockReply = `You asked: "${message}", and this is a mock GPT response. becuase You exceeded your current quota, please check your plan and billing details`;
//       return res.json({ reply: mockReply });
//     }


//   console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: message }],
//       },
//       {
//         headers: {
//             'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//         }
//       }
//     );
//     console.log("Response from OpenAI:", response.data);
//     res.json({ reply: response.data.choices[0].message.content });
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: "Failed to connect to ChatGPT" });
//   }
// };

//huggingface

const chatWithGPT = async (req, res) => {
    const { message } = req.body;
  console.log("HUGGINGFACE_API_KEY:", process.env.HUGGINGFACE_API_KEY);
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
        {
          inputs: message,
        },
        
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const reply = response.data?.[0]?.generated_text || "No response from Hugging Face";
  
      res.json({ reply });
    } catch (error) {
      console.error("Hugging Face API Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to connect to Hugging Face API" });
    }
  };
  
export default chatWithGPT;

