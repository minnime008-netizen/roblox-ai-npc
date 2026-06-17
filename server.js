app.get("/chat", async (req, res) => {
  const message = req.query.message;

  if (!message) {
    return res.json({ reply: "Say something." });
  }

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are a Roblox NPC.
Rules:
- Reply to EVERYTHING the player says
- Keep replies short (1–2 sentences)
- Stay in character
- Be interactive like a game NPC
        `
      },
      { role: "user", content: message }
    ],
  });

  res.json({
    reply: response.choices[0].message.content
  });
});
