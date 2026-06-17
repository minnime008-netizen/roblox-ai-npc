import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("AI NPC server running");
});

app.get("/chat", async (req, res) => {
  try {
    const prompt = req.query.message;

    if (!prompt) {
      return res.json({ reply: "No message sent." });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a Roblox NPC. Keep replies short and natural." },
        { role: "user", content: prompt }
      ],
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "AI error occurred." });
  }
});

app.listen(3000, () => console.log("Server running"));
