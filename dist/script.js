const chords = {
  C: {
    keys: [ 'C1', 'E1', 'G1' ],
  },
  F: {
    keys: [ 'C1', 'F1', 'A1' ],
  },
  G: {
    keys: [ 'D1', 'G1', 'B1' ],
  },
  Am: {
    keys: [ 'E1', 'A1', 'C2' ],
  },
  Bb: {
    keys: [ 'D1', 'F1', 'Bb1' ],
  },
}

const notes = {
  C1: new Audio('sounds/C1.wav'),
  Db1: new Audio('sounds/Db1.wav'),
  D1: new Audio('sounds/D1.wav'),
  Eb1: new Audio('sounds/Eb1.wav'),
  E1: new Audio('sounds/E1.wav'),
  F1: new Audio('sounds/F1.wav'),
  Gb1: new Audio('sounds/Gb1.wav'),
  G1: new Audio('sounds/G1.wav'),
  Ab1: new Audio('sounds/Ab1.wav'),
  A1: new Audio('sounds/A1.wav'),
  Bb1: new Audio('sounds/Bb1.wav'),
  B1: new Audio('sounds/B1.wav'),
  C2: new Audio('sounds/C2.wav'),
}

  let currentChord = 1
  const keys = document.querySelector('.keys')
  const keys2 = document.querySelector('.keys2')
  const bottomKeys = document.querySelector('.showKeys')
  const chordSounds = Array.from(document.querySelectorAll('.chord'))
  const body = document.querySelector('body');
  const changeBackground = document.querySelector('#changeBackground');
  const tonalitySelector = document.querySelector('#tonalitySelector'); 
  const tonalityButtons = Array.from(document.querySelectorAll('.tonality-button'))
  const fullScreen = document.querySelector('#fullScreen');
  const activeKeys = [ 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN' ]
  let noteLetter = 'C1'
  let audio = notes[noteLetter]

  const alreadyPressed = [];

  fullScreen.addEventListener('click', openFullscreen);

  keys.addEventListener('click', onKeyClick);
  keys2.addEventListener('click', onKeyClick);
  
  tonalitySelector.addEventListener('click', () => {
    document.querySelector('.tonalitiesContainer').classList.toggle('--visible')
  });

  tonalityButtons.forEach(button => button.addEventListener('click', selectTonality))
  
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  function selectTonality(e) {
    e.target.classList.toggle('--selected')
  }

  function onKeyClick(e) {
    const key = e.target.closest('button');
    key.classList.add("playing");
    if (key.dataset.chord) {
      const chordLetter = document.querySelector(`button[data-code="${key.dataset.code}"]`).dataset.chord;
      const chordKeys = chords[chordLetter].keys
      chordKeys.map(key => {
        notes[key].currentTime = 0
        notes[key].play()
      })
      setTimeout(() => { key.classList.remove("playing") }, 100)
      if (key.id === 'chord1') {
        currentChord = 1
        glowChordOnClick()
      } else if (key.id === 'chord2') {
        currentChord = 2
        glowChordOnClick()
      } else if (key.id === 'chord3') {
        currentChord = 3
        glowChordOnClick()
      }  else if (key.id === 'chord4') {
        currentChord = 4
        glowChordOnClick()
      } else if (key.id === 'chord5') {
        currentChord = 5
        glowChordOnClick()
      }
      return
    }
    const noteLetter = document.querySelector(`button[data-code="${key.dataset.code}"]`).dataset.note;
    const audio = notes[noteLetter]
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => { key.classList.remove("playing") }, 100)

  }

  function onKeyDown(e) {
  
    if (alreadyPressed.includes(e.code)) return;
    alreadyPressed.push(e.code);
  
    let element = document.querySelector(`button[data-code="${e.code}"]`)
    element.classList.add('playing')

    // IF NOTE 
  
    if (document.querySelector(`button[data-code="${e.code}"]`).dataset.note) {
  
      let note = document.querySelector(`button[data-code="${e.code}"]`).dataset.note
  
  
      notes[note].currentTime = 0
      notes[note].play()
    }
  
    if (!activeKeys.includes(e.code)) {
      return
    }

    // IF CHORD
  
    if (document.querySelector(`button[data-code="${e.code}"]`).dataset.chord) {
  
      let chord = document.querySelector(`button[data-code="${e.code}"]`).dataset.chord
  
      if (e.code === 'KeyX') {
        currentChord = 1
      } else if (e.code === 'KeyC') {
        currentChord = 2
      } else if (e.code === 'KeyV') {
        currentChord = 3
      }  else if (e.code === 'KeyB') {
        currentChord = 4
      } else if (e.code === 'KeyN') {
        currentChord = 5
      }

      let chordLetter = document.querySelector(`#chordLetter${currentChord}`).textContent.trim()

      chords[chordLetter].keys.forEach(key => {
        notes[key].currentTime = 0
        notes[key].play()
      })
      
      glowChordOnKey()
    }
  }

function onKeyUp(e) {

  if (!activeKeys.includes(e.code)) {
    return
  }

  let pressedKey = alreadyPressed.indexOf(e.code)
  alreadyPressed.splice(pressedKey, 1)
  let key = document.querySelector(`[data-code=${e.code}]`)
  key.classList.remove('playing', 'glowKey', 'glowChord', 'chordIndicatorOn');

  if (e.code === 'KeyX') {
    currentChord = 1
    glowChordOff()
  } else if (e.code === 'KeyC') {
    currentChord = 2
    glowChordOff()
  } else if (e.code === 'KeyV') {
    currentChord = 3
    glowChordOff()
  }  else if (e.code === 'KeyB') {
    currentChord = 4
    glowChordOff()
  } else if (e.code === 'KeyN') {
    currentChord = 5
    glowChordOff()
  }
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;  
  const key = e.target.closest('button') || e.target
  key.classList.remove('playing', 'glowKey', 'glowChord', 'chordIndicatorOn');
}

  changeBackground.addEventListener('transitionend', removeTransition);
  changeBackground.addEventListener('click', function() {
    document.querySelector('#background').classList.toggle('background2');
  });

  function glowChordOnKey() {
  let letter = document.querySelector(`#chordLetter${currentChord}`).textContent.trim()
  let chordElement = document.querySelector(`#chordLetter${currentChord}`)
  
  if (chords[letter]) {
    chords[letter].keys.map(key => document.querySelector(`div[data-note="${key}"`).classList.add('glowChord'))
    chordElement.classList.add('chordIndicatorOn');
  }
  
}

function glowChordOnClick() {
  let chordElement = document.querySelector(`#chordLetter${currentChord}`)
  let letter = chordElement.textContent.trim()
  
  if (chords[letter]) {
    chords[letter].keys.map(key => document.querySelector(`div[data-note="${key}"`).classList.add('glowChord'))
    chordElement.classList.add('chordIndicatorOn');
    setTimeout(() => {
      chords[letter].keys.map(key => document.querySelector(`div[data-note="${key}"`).classList.remove('glowChord'))
      chordElement.classList.remove('chordIndicatorOn');
    }, 500)
  }
  
}

function glowChordOff() {
    let letter = document.querySelector(`#chordLetter${currentChord}`).textContent.trim()
    let chordElement = document.querySelector(`#chordLetter${currentChord}`)
    
    setTimeout(() => {
      chords[letter].keys.map(key => document.querySelector(`div[data-note="${key}"`).classList.remove('glowChord'))
      chordElement.classList.remove('chordIndicatorOn');
    }, 500)

}


  // FULL SCREEN BUTTON //

  /* Get the documentElement (<html>) to display the page in fullscreen */
let elem = document.documentElement;

  /* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}