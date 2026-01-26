import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your valid API key
const genAI = new GoogleGenerativeAI("AIzaSyCFK_7iZq6i8bmkbd-uv6q6NN0bpK3b-pg");

// Predefined student-friendly knowledge
const IGDTUW_PROMPTS = `
You are a friendly senior student at IGDTUW.
Use this info to answer questions:
- Courses: B.Tech in CS, CS-AI ,IT, ECE, Mechanical and Automation , MAC , DMAM 
- student clubs:  tarannum (music) , hypnotics(dance) , BHAV(debate and MUNs) , ECELL , ZENA(fashion society).
- Placements: Microsoft, Google, Infosys, TCS, Amazon
- Student Life: Clubs, APD, TDIC, hostels, gyms
- Faculty: supportive and approachable
- package: average pkg and highest pkg of last 5 years
- Labs & Facilities: well-equipped labs, library, sports
- CSE & CS-AI: strong tech placements with highest ~₹56 LPA & avg ~₹25 LPA for CSE, avg ~₹22.8 LPA for CS-AI in latest drives (lots of internships too)
- IT: solid software placements with highest ~₹52.9 LPA & avg ~₹21 LPA; good hybrid roles and intern conversions
- ECE: decent tech & semi-core offers with highest ~₹56 LPA & avg ~₹19.6 LPA but less volume compared to CSE/IT
- MAE/mae (Mechanical & Automation): internships & core placements available but average ~₹11-12 LPA and mix of both tech and core offers with some top tech offers — choose if you love core machines/industry
- MCA & MTech: postgraduate placements also happening; MCA highest ~₹52.9 LPA & avg ~₹14 LPA; MTech AI avg ~₹13–14 LPA
- Internship trend: many students from all streams get 6-month internships onboarded into big companies before final placement season
- Branch vibe: tech branches (CSE/IT/CS-AI) get bulk of on-campus recruiters; core branches (like MAE) need proactive networking & off-campus prep
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
