const words = document.querySelectorAll('.word');
const dropZones = document.querySelectorAll('.drop-zone');
const wrongWords = document.querySelector('.wrong-words');
const wannaCheat = false;

let currentlySelected = null;

words.forEach(word => {
  word.addEventListener('dragstart', dragStart);
  word.addEventListener('dragend', dragEnd);
  word.addEventListener('click', selectWord);
});

dropZones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', drop);
  zone.addEventListener('click', dropOnClick);
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

  if (e.target.classList.contains('drop-zone') || e.target === wrongWords) {
    if (category === wordCategory) {
      e.target.appendChild(currentlyDragged);
    } else {
      currentlyDragged.classList.add('wrong');
      wrongWords.appendChild(currentlyDragged);
    }
  }
}

function selectWord(e) {
  if (currentlySelected) {
    currentlySelected.classList.remove('selected');
  }
  currentlySelected = e.target;
  currentlySelected.classList.add('selected');
}

function dropOnClick(e) {
  if (!currentlySelected) return;
  const category = e.target.dataset.category;
  const wordCategory = currentlySelected.dataset.category;

  if (e.target.classList.contains('drop-zone') || e.target === wrongWords) {
    if (category === wordCategory) {
      e.target.appendChild(currentlySelected);
    } else {
      currentlySelected.classList.add('wrong');
      wrongWords.appendChild(currentlySelected);
    }
    currentlySelected.classList.remove('selected');
    currentlySelected = null;
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
