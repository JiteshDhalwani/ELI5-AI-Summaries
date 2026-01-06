const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 1. Get the topic from the frontend
    const body = JSON.parse(event.body);
    const topic = body.topic;

    // 2. Connect to Google AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. Ask the question
    const prompt = `Explain ${topic} to me like I am a 5 year old. Keep it simple, fun, and under 100 words.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Send the answer back to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ explanation: text }),
    };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};