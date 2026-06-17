local HttpService = game:GetService("HttpService")

local url = "https://roblox-ai-bngg.onrender.com/chat?message="

local function askAI(msg)
	local fullUrl = url .. HttpService:UrlEncode(msg)

	local success, result = pcall(function()
		return HttpService:GetAsync(fullUrl)
	end)

	if success then
		local data = HttpService:JSONDecode(result)
		print(data.reply)
		return data.reply
	else
		warn("Request failed")
		return "Error"
	end
end

askAI("Hello NPC")
