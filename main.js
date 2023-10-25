import { rollQuantumDie } from './quantum.js';
import { generateMelody } from './audio.js';

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.textContent = text;
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function updateQuantumClock() {
  // Your existing code for the quantum clock
}

function getResponse() {
  try {
    let quantumField = '';
    let i = 0;
    const interval = setInterval(function() {
      if (i >= 4000) {
        clearInterval(interval);
        copyToClipboard(quantumField);
        generateMelody(quantumField);
      } else {
        quantumField += rollQuantumDie();
        document.getElementById('quantumFieldContainer').innerText = quantumField;
      }
      i++;
    }, 50);

    setInterval(updateQuantumClock, 1000);
  } catch (error) {
    console.error(error);
    alert('An error occurred: ' + error.message);
  }
}

updateQuantumClock();
