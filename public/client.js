// Automatically connects to the server that served the page
const socket = io();

const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ding.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message', position);
  messageContainer.append(messageElement);
  if (position === 'left') {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageinput.value.trim();
  if (!message) return;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageinput.value = '';
});

let name = '';
while (!name) {
  name = prompt("Enter your name to join");
}
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
  append(`${name} left the chat`, 'right');
});
