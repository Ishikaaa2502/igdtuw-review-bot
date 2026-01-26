// Offline IGDTUW Student Bot by Ishika Pandey

const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Predefined responses
const responses = {
  /*"branches": "IGDTUW offers B.Tech in: \n- CSE-AI\n- CSE-DS\n- IT\n- ECE\n- Mechanical\n- Civil",
  "placements": `Placements info:\n- Avg Package: ₹12-15 LPA\n- Highest: ₹42 LPA (CSE)\n- Top Recruiters: Microsoft, Google, Infosys, TCS, Amazon`,
  "hostel": "Hostels are comfortable, safe, and well-managed with gyms, common rooms, and mess facilities.",
  "labs": "Labs are well-equipped for all branches including Computer, Electronics, Mechanical, and Civil labs.",
  "faculty": "Faculty members are supportive and approachable, helping students in academics and projects.",
  "clubs": `Cultural & extracurriculars:\n- Clubs: TDIC, APD, Coding, Robotics, Music, Dance, Drama\n- Events: Annual APD fest, hackathons, cultural nights`,
  "cse": "CSE branch focuses on AI, DS, and Software Development. Avg Package: ₹12-15 LPA, Highest: ₹42 LPA. Labs include AI/ML and coding labs.",
  "ece": "ECE branch focuses on Embedded Systems, VLSI, Communication. Avg Package: ₹12 LPA, Labs include electronics and communication labs.",
  "it": "IT branch focuses on Web Dev, Networking, Cloud. Avg Package: ₹10-12 LPA, Labs include programming and networking labs.",
  "me": "Mechanical Engineering emphasizes Design, Thermodynamics, Robotics. Avg Package: ₹8-10 LPA. Labs include CAD/CAM and Robotics workshops.",
  "ce": "Civil Engineering focuses on Structural Design, Environmental Engineering. Avg Package: ₹6-8 LPA. Labs include Material Testing and CAD* labs."
*/
"branches": "IGDTUW offers B.Tech in: \n- CSE\n- CS-AI\n- IT\n- ECE\n- Mechanical & Automation\n- MAC\n- DMAM",
"placements": `Placements info (last 5 years):\n- Avg Package: ₹12–15 LPA (overall)\n- Highest: ~₹56 LPA (CSE/CS-AI/IT/ECE)\n- Top Recruiters: Microsoft, Google, Infosys, TCS, Amazon`,
"hostel": "Hostels are comfortable, safe, and well-managed with gyms, common rooms, mess facilities, and a secure women-only campus.",
"labs": "Labs are well-equipped for all branches including Computer, AI/ML, Electronics, Mechanical & Automation labs, along with a central library and sports facilities.",
"faculty": "Faculty members are supportive and approachable, helping students in academics, projects, internships, and research guidance.",
"clubs": `Cultural & extracurriculars:\n- Clubs: Tarannum (Music), Hypnotics (Dance), BHAV (Debate & MUNs), ECELL, ZENA (Fashion Society)\n- Events: APD fest, TDIC events, hackathons, cultural nights`,
"cse": "CSE focuses on Software Development, AI/ML, and Data Science. Avg Package: ~₹25 LPA, Highest: ~₹56 LPA. Strong internship and PPO culture.",
"cs_ai": "CS-AI focuses on Artificial Intelligence, Machine Learning, and Data Science. Avg Package: ~₹22.8 LPA. High internship and research exposure.",
"it": "IT focuses on Web Development, Backend, Cloud, and Systems. Avg Package: ~₹21 LPA, Highest: ~₹52.9 LPA. Good hybrid roles and intern conversions.",
"ece": "ECE focuses on Embedded Systems, VLSI, and Communication. Avg Package: ~₹19.6 LPA. Decent tech and semi-core offers with fewer recruiters than CSE/IT.",
"mae": "Mechanical & Automation emphasizes Design, Robotics, Automation, and core engineering. Avg Package: ~₹11-12 LPA. Mix of core and tech roles.",
"pg": "Postgraduate programs include MCA and M.Tech. MCA Avg ~₹14 LPA (Highest ~₹52.9 LPA); M.Tech AI Avg ~₹13-14 LPA.",
"internships": "Strong internship trend with on-campus summer internships including intenships of 2 months or 4 months; help students fetch govt internships for eg drdo , dmrc are very common ,many students convert internships into PPOs before final placements.",
"branch_vibe": "Tech branches (CSE, CS-AI, IT) attract bulk recruiters; core branches like Mechanical & Automation benefit from proactive off-campus prep and networking.",
"student_life": "Student life includes active clubs, APD, TDIC events, hostels, gyms, sports, and a supportive senior-junior culture."
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
