const words = document.querySelectorAll('.word');
const dropZones = document.querySelectorAll('.drop-zone');
const wrongWords = document.querySelector('.wrong-words');
const wannaCheat = false;

let currentlyDragged = null;

words.forEach(word => {
  word.addEventListener('dragstart', dragStart);
  word.addEventListener('dragend', dragEnd);
});

dropZones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', drop);
});

function dragStart(e) {
  currentlyDragged = e.target;
  setTimeout(() => {
    e.target.classList.add('dragging');
  }, 0);
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
  currentlyDragged = null;
}
function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const category = e.target.dataset.category;
  const word = currentlyDragged.dataset.word;
  const wordCategory = currentlyDragged.dataset.category;

  // Check if the target is a valid container (and not a wrong drop zone)
  if (e.target.classList.contains('drop-zone') || e.target === wrongWords) {
    if (category === wordCategory) {
      // Append the dragged element to the correct category
      e.target.appendChild(currentlyDragged);
    } else {
      // Add the 'wrong' class and append to wrongWords container
      currentlyDragged.classList.add('wrong');
      wrongWords.appendChild(currentlyDragged);
    }
  }
}

function toggleDarkTheme() {
  document.body.classList.toggle('dark');
  const toggleIcon = document.querySelector('.toggle-theme i');
  if (document.body.classList.contains('dark')) {
    toggleIcon.classList.remove('fa-moon');
    toggleIcon.classList.add('fa-sun');
  } else {
    toggleIcon.classList.remove('fa-sun');
    toggleIcon.classList.add('fa-moon');
  }
}

const container = document.querySelector('.words');
const divs = Array.from(container.children);
divs.sort(() => Math.random() - 0.5);
divs.forEach(div => container.appendChild(div));

if (wannaCheat){
document.querySelectorAll('.word').forEach(div => {
    const category = div.getAttribute('data-category');
    if (category) {
        div.innerHTML += ` (Category: ${category})`;
    }
});
}
