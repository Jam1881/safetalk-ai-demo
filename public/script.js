const consentOverlay = document.getElementById("consentOverlay");
const confirmBtn = document.getElementById("confirmConsent");

// Check if user already consented
if (localStorage.getItem("safetalkConsent") === "true") {
  consentOverlay.style.display = "none";
}

// Confirm consent
confirmBtn.addEventListener("click", () => {
  localStorage.setItem("safetalkConsent", "true");
  consentOverlay.style.display = "none";
});

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.id = "typingIndicator";
  typing.innerText = "SafeTalk AI is typing…";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  showTyping();

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    removeTyping();

    addMessage("bot", data.reply);

  } catch (error) {
    removeTyping();
    addMessage(
      "bot",
      "I’m having trouble responding right now. That’s okay, you can try again later."
    );
  }
}
