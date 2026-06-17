const express = require("express")
const OpenAI = require("openai")

const app = express()

app.use(express.json())

const client = new OpenAI({
 apiKey: process.env.OPENAI_KEY
})

app.get("/", (req,res)=>{
 res.send("NPC Server Online")
})

app.post("/talk", async (req,res)=>{

 try{

  const response =
  await client.chat.completions.create({

   model:"gpt-5",

   messages:[
    {
     role:"system",
     content:"You are a Roblox NPC."
    },
    {
     role:"user",
     content:req.body.message || ""
    }
   ]

  })

  res.json({
   reply:
   response.choices[0].message.content
  })

 }catch(err){

  console.log(err)

  res.json({
   reply:"Error"
  })

 }

})

const PORT =
process.env.PORT || 10000

app.listen(PORT,()=>{

 console.log(
  "Server running on "+PORT
 )

})
