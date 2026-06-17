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
  res.send("AI NPC Server Online");
});

app.get("/chat", async (req, res) => {
  try {
    const message = req.query.message;

    if (!message) {
      return res.json({ reply: "Say something." });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a Roblox NPC. Reply to everything. Keep answers short (1-2 sentences). Be natural and game-like."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "AI error happened." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
