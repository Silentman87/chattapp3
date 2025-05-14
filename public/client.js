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
  // Add common styles
  messageElement.style.cssText = 'padding: 10px 15px; margin: 10px; border-radius: 1rem; max-width: 60%; font-size: 16px; color: black; position: relative;';


  // Add position-specific styles
  if (position === 'left') {
    
    audio.play();
    messageElement.style.backgroundColor = '#bcdfeb';
    opacity: 0.7;
    messageElement.style.alignSelf = 'flex-start';
    audio.play();
  } else if (position === 'right') {
    messageElement.style.backgroundColor = '#bcdfeb';;
    opacity: 0.7;
    messageElement.style.alignSelf = 'flex-end';
  }

  messageContainer.append(messageElement);
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






   