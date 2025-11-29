import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your valid API key
const genAI = new GoogleGenerativeAI("AIzaSyCFK_7iZq6i8bmkbd-uv6q6NN0bpK3b-pg");

// Predefined student-friendly knowledge
const IGDTUW_PROMPTS = `
You are a friendly senior student at IGDTUW.
Use this info to answer questions:
- Courses: B.Tech in CS, IT, ECE, Mechanical, Civil
- Placements: Microsoft, Google, Infosys, TCS, Amazon
- Student Life: Clubs, APD, TDIC, hostels, gyms
- Faculty: supportive and approachable
- Labs & Facilities: well-equipped labs, library, sports
Answer naturally, like a senior giving honest advice. Be cheerful and student-friendly.
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askGemini(question) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: question }] }
      ],
      systemInstruction: IGDTUW_PROMPTS
    });

    return result.response.text();
  } catch (err) {
    return "Error: " + err.message;
  }
}

// Main chat loop
function ask() {
  rl.question("Ask about IGDTUW --> ", async (userInput) => {
    if (userInput.trim().toLowerCase() === "exit") {
      console.log("Goodbye! 🎓");
      rl.close();
      return;
    }

    const response = await askGemini(userInput);
    console.log("\nBot:", response, "\n");

    ask(); // Keep the chat going
  });
}

ask();
