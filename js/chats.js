const emojiBtn = document.getElementById("emojiBtn");
const stickerPanel = document.getElementById("stickerPanel");
const chatMessages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");

let stickerOpen = false;

// Abrir / cerrar panel
emojiBtn.addEventListener("click", () => {
  stickerOpen = !stickerOpen;

  if (stickerOpen) {
    stickerPanel.style.display = "grid";
  } else {
    stickerPanel.style.display = "none";
  }
});

// Enviar mensaje texto
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  if (chatInput.value.trim() === "") return;

  const msg = document.createElement("div");
  msg.textContent = chatInput.value;
  msg.style.background = "#dc3545";
  msg.style.color = "white";
  msg.style.padding = "8px 12px";
  msg.style.borderRadius = "15px";
  msg.style.marginBottom = "8px";
  msg.style.alignSelf = "flex-end";
  msg.style.maxWidth = "70%";

  chatMessages.appendChild(msg);
  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Enviar sticker
document.querySelectorAll(".sticker").forEach(sticker => {
  sticker.addEventListener("click", () => {

    const img = document.createElement("img");
    img.src = sticker.src;
    img.style.width = "120px";
    img.style.marginBottom = "8px";
    img.style.alignSelf = "flex-end";

    chatMessages.appendChild(img);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    stickerPanel.style.display = "none";
    stickerOpen = false;
  });
});


