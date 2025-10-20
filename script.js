const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;
const correctLetters = [];
const wrongLetters = [];

// Display the hidden word
function displayWord() {
  wordEl.innerHTML = selectedWord
    .split('')
    .map(
      letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`
    )
    .join('');

  const currentWord = wordEl.innerText.replace(/\s/g, '');

  if (currentWord === selectedWord) {
    finalMessage.innerText = '🎉 Congratulations! You won!';
    popup.style.display = 'flex';
    playable = false;
  }
}

// Update wrong letters and hangman figure
function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
  `;

  figureParts.forEach((part, index) => {
    part.style.display = index < wrongLetters.length ? 'block' : 'none';
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = '😞 You lost!';
    finalMessageRevealWord.innerText = `The word was: ${selectedWord}`;
    popup.style.display = 'flex';
    playable = false;
  }
}

// Show temporary notification
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => notification.classList.remove('show'), 2000);
}

// Listen for key presses
window.addEventListener('keydown', e => {
  if (playable && e.key.match(/^[a-zA-Z]$/)) {
    const letter = e.key.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

// Restart the game
playAgainBtn.addEventListener('click', () => {
  playable = true;
  correctLetters.length = 0;
  wrongLetters.length = 0;

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLetters();
  popup.style.display = 'none';
});
