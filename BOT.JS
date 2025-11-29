// Offline IGDTUW Student Bot by Ishika Pandey

const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Predefined responses
const responses = {
  "branches": "IGDTUW offers B.Tech in: \n- CSE-AI\n- CSE-DS\n- IT\n- ECE\n- Mechanical\n- Civil",
  "placements": `Placements info:\n- Avg Package: ₹12-15 LPA\n- Highest: ₹42 LPA (CSE)\n- Top Recruiters: Microsoft, Google, Infosys, TCS, Amazon`,
  "hostel": "Hostels are comfortable, safe, and well-managed with gyms, common rooms, and mess facilities.",
  "labs": "Labs are well-equipped for all branches including Computer, Electronics, Mechanical, and Civil labs.",
  "faculty": "Faculty members are supportive and approachable, helping students in academics and projects.",
  "clubs": `Cultural & extracurriculars:\n- Clubs: TDIC, APD, Coding, Robotics, Music, Dance, Drama\n- Events: Annual APD fest, hackathons, cultural nights`,
  "cse": "CSE branch focuses on AI, DS, and Software Development. Avg Package: ₹12-15 LPA, Highest: ₹42 LPA. Labs include AI/ML and coding labs.",
  "ece": "ECE branch focuses on Embedded Systems, VLSI, Communication. Avg Package: ₹12 LPA, Labs include electronics and communication labs.",
  "it": "IT branch focuses on Web Dev, Networking, Cloud. Avg Package: ₹10-12 LPA, Labs include programming and networking labs.",
  "me": "Mechanical Engineering emphasizes Design, Thermodynamics, Robotics. Avg Package: ₹8-10 LPA. Labs include CAD/CAM and Robotics workshops.",
  "ce": "Civil Engineering focuses on Structural Design, Environmental Engineering. Avg Package: ₹6-8 LPA. Labs include Material Testing and CAD labs."
};

// Helper to pick a response
function getResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("branch")) return responses["branches"];
  if (q.includes("placement") || q.includes("package")) return responses["placements"];
  if (q.includes("hostel")) return responses["hostel"];
  if (q.includes("lab")) return responses["labs"];
  if (q.includes("faculty")) return responses["faculty"];
  if (q.includes("club") || q.includes("cultural") || q.includes("activity")) return responses["clubs"];
  if (q.includes("cse")) return responses["cse"];
  if (q.includes("ece")) return responses["ece"];
  if (q.includes("it")) return responses["it"];
  if (q.includes("mechanical") || q.includes("me")) return responses["me"];
  if (q.includes("civil") || q.includes("ce")) return responses["ce"];

  return "I am a student-friendly bot. I can answer questions about branches, placements, hostels, labs, faculty, and cultural activities at IGDTUW.";
}

// Append message to chat window
function appendMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Send message function
function sendMessage() {
  const question = userInput.value.trim();
  if (!question) return;

  appendMessage(question, "user");
  userInput.value = "";

  setTimeout(() => {
    const answer = getResponse(question);
    appendMessage(answer, "bot");
  }, 300); // small delay for realism
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
