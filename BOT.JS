// bot.js
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let knowledgeBase = null;

// Disable input until JSON loads
sendBtn.disabled = true;
userInput.disabled = true;

// Load knowledge base
fetch("placements.json")
  .then(res => res.json())
  .then(data => {
    knowledgeBase = data;
    sendBtn.disabled = false;
    userInput.disabled = false;
  })
  .catch(err => {
    console.error("Failed to load JSON:", err);
    // Fallback knowledge if JSON fails
    knowledgeBase = {
      branches: ["CSE", "CSE-AI", "IT", "ECE", "MAE", "MaC", "DMAM"],
      branchDetails: {
        "MAE": "Mechanical & Automation Engineering focuses on design, robotics, thermodynamics, and CAD/CAM.",
        "MaC": "Materials and Coatings Engineering focuses on material properties, manufacturing, and testing.",
        "DMAM": "Design, Manufacturing, and Automation focuses on product design, automation, and industrial projects."
      },
      placementData: {},
      campusLife: "Campus life is positive with fests, clubs, and peer activities.",
      faculty: "Faculty are generally supportive and knowledgeable.",
      library: "Library has good resources for study and research.",
      research: "Strong focus on research and innovation.",
      fests: "Annual cultural and technical fests are celebrated."
    };
    sendBtn.disabled = false;
    userInput.disabled = false;
  });

// Generate bot response
function getResponse(question) {
  const q = question.toLowerCase().trim();

  if (!knowledgeBase) return "Loading data... please wait a moment.";

  // Branches
  if (q.includes("branch")) {
    return `IGDTUW offers the following branches: ${knowledgeBase.branches.join(", ")}.`;
  }

  // Branch descriptions
  if (q.includes("mae") || q.includes("mac") || q.includes("dmam")) {
    if (q.includes("mae")) return knowledgeBase.branchDetails["MAE"];
    if (q.includes("mac")) return knowledgeBase.branchDetails["MaC"];
    if (q.includes("dmam")) return knowledgeBase.branchDetails["DMAM"];
  }

  // Placements
  if (q.includes("placement") || q.includes("package")) {
    const branchMatch = knowledgeBase.branches.find(b => q.includes(b.toLowerCase()));
    if (branchMatch && knowledgeBase.placementData[branchMatch]) {
      const data = knowledgeBase.placementData[branchMatch];
      return `For ${branchMatch}, approximately ${data.placementRate} of students get placed. Average package: ${data.averagePackage}. Highest package: ${data.highestPackage}.`;
    }
    return "Placements vary by branch; top packages can reach very high in CS/AI/IT branches.";
  }

  // Campus life
  if (q.includes("campus") || q.includes("life") || q.includes("hostel") || q.includes("library")) {
    return `${knowledgeBase.campusLife}\nLibrary: ${knowledgeBase.library}`;
  }

  // Faculty
  if (q.includes("faculty") || q.includes("teacher") || q.includes("professor")) {
    return knowledgeBase.faculty;
  }

  // Research / innovation
  if (q.includes("research") || q.includes("innovation") || q.includes("co-e") || q.includes("incubation")) {
    return knowledgeBase.research;
  }

  // Fests / cultural
  if (q.includes("fest") || q.includes("event") || q.includes("cultural")) {
    return knowledgeBase.fests;
  }

  return "I am a student-friendly bot. I can answer questions about branches, placements, campus life, faculty, research, and cultural activities at IGDTUW.";
}

// Append message with like button
function appendMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  div.textContent = text;

  if (sender === "bot") {
    const likeBtn = document.createElement("button");
    likeBtn.textContent = "❤️";
    likeBtn.classList.add("like-btn");

    const likeCount = document.createElement("span");
    likeCount.textContent = "0";
    likeCount.classList.add("like-count");

    likeBtn.addEventListener("click", () => {
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
    });

    div.appendChild(likeBtn);
    div.appendChild(likeCount);
  }

  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Send message
function sendMessage() {
  const question = userInput.value.trim();
  if (!question) return;

  appendMessage(question, "user");
  userInput.value = "";

  setTimeout(() => {
    const answer = getResponse(question);
    appendMessage(answer, "bot");
  }, 300);
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
