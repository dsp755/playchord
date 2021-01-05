let currentTonality = 'C'
let currentKey = 'major'

const chords = {
  C: {
    keys: [ 'C1', 'E1', 'G2', 'C2' ],
  },
  Cm: {
    keys: [ 'C1', 'Eb2', 'G2', 'C3' ],
  },
  D: {
    keys: [ 'D1', 'Gb1', 'A2', 'D2' ],
  },
  F: {
    keys: [ 'F1', 'C2', 'A2', 'C3' ],
  },
  Fm: {
    keys: [ 'F1', 'C2', 'Ab2', 'C3' ],
  },
  G: {
    keys: [ 'G1', 'D2', 'B2', 'D3' ],
  },
  Gm: {
    keys: [ 'G1', 'D2', 'Bb2', 'D3' ],
  },
  Ab: {
    keys: [ 'Ab1','Eb2', 'Ab2', 'C3' ],
  },
  A: {
    keys: [ 'A1','E2', 'A2', 'Db3' ],
  },
  Am: {
    keys: [ 'A1','E2', 'A2', 'C3' ],
  },
  Bm: {
    keys: [ 'B1', 'D2', 'Gb2', 'B2' ],
  },
  Bb: {
    keys: [ 'Bb1', 'D2', 'F2', 'Bb2' ],
  },
}

const notes = {
  C1: new Audio('sounds/C1.mp3'),
  Db1: new Audio('sounds/Db1.mp3'),
  D1: new Audio('sounds/D1.mp3'),
  Eb1: new Audio('sounds/Eb1.mp3'),
  E1: new Audio('sounds/E1.mp3'),
  F1: new Audio('sounds/F1.mp3'),
  Gb1: new Audio('sounds/Gb1.mp3'),
  G1: new Audio('sounds/G1.mp3'),
  Ab1: new Audio('sounds/Ab1.mp3'),
  A1: new Audio('sounds/A1.mp3'),
  Bb1: new Audio('sounds/Bb1.mp3'),
  B1: new Audio('sounds/B1.mp3'),
  C2: new Audio('sounds/C2.mp3'),
  Db2: new Audio('sounds/Db2.mp3'),
  D2: new Audio('sounds/D2.mp3'),
  Eb2: new Audio('sounds/Eb2.mp3'),
  E2: new Audio('sounds/E2.mp3'),
  F2: new Audio('sounds/F2.mp3'),
  Gb2: new Audio('sounds/Gb2.mp3'),
  G2: new Audio('sounds/G2.mp3'),
  Ab2: new Audio('sounds/Ab2.mp3'),
  A2: new Audio('sounds/A2.mp3'),
  Bb2: new Audio('sounds/Bb2.mp3'),
  B2: new Audio('sounds/B2.mp3'),
  C3: new Audio('sounds/C3.mp3'),
  Db3: new Audio('sounds/Db3.mp3'),
  D3: new Audio('sounds/D3.mp3'),
  Eb3: new Audio('sounds/Eb3.mp3'),
  E3: new Audio('sounds/E3.mp3'),
  F3: new Audio('sounds/F3.mp3'),
  Gb3: new Audio('sounds/Gb3.mp3'),
  G3: new Audio('sounds/G3.mp3'),
  Ab3: new Audio('sounds/Ab3.mp3'),
  A3: new Audio('sounds/A3.mp3'),
  Bb3: new Audio('sounds/Bb3.mp3'),
  B3: new Audio('sounds/B3.mp3')
}

const tonalities = {
  'C': {
    'major': {
      'notes': [ 'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3' ],
      'chords': [ 'C', 'F', 'G', 'Am', 'Bb' ]
    },
    'minor': {
      'notes': [ 'C2', 'D2', 'Eb2', 'F2', 'G2', 'Ab2', 'Bb2', 'C3' ],
      'chords': [ 'Cm', 'Fm', 'Gm', 'Ab', 'Am' ]
    }
  },
  'D': {
    'major': {
      'notes': [ 'D2', 'E2', 'Gb2', 'G2', 'A2', 'B2', 'Db3', 'D3' ],
      'chords': [ 'D', 'G', 'A', 'Bm', 'C' ]
    }
  }
}

let currentChord = 1
const keys = document.querySelector('.keys')
const keys2 = document.querySelector('.keys2')
const chordSounds = Array.from(document.querySelectorAll('.chord'))
const body = document.querySelector('body');
const changeBackground = document.querySelector('#changeBackground')
const tonalitySelector = document.querySelector('#tonalitySelector')
const tonalityButtons = Array.from(document.querySelectorAll('.tonality-button'))
const fullScreen = document.querySelector('#fullScreen')
const activeKeys = [ 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN' ]
const chordKeys = [ 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN' ]
let noteLetter = 'C1'
let audio = notes[noteLetter]

const setChordletters = () => {
  const letters = Array.from(document.querySelectorAll('.chordLetter'))
  for (index = 0; index < letters.length; index += 1) {
    letters[index].textContent = tonalities[currentTonality][currentKey].chords[index]
  }
}

setChordletters()

const tonalityKeys = Array.from(document.querySelectorAll('.tonality-key'))
const tonalityModes = Array.from(document.querySelectorAll('.tonality-mode'))


tonalityKeys.forEach(el => el.addEventListener('mousedown', () => {
  tonalityKeys.map(el => el.classList.remove('--selected'))
  el.classList.add('--selected')
  currentTonality = el.textContent
  setChordletters()
  }))

tonalityModes.forEach(el => el.addEventListener('mousedown', () => {
  tonalityModes.map(el => el.classList.remove('--selected'))
  el.classList.add('--selected')
  currentKey = el.textContent.toLowerCase()
  setChordletters()
  }))

const alreadyPressed = []

fullScreen.addEventListener('mousedown', openFullscreen)

keys.addEventListener('mousedown', onKeyClick)
keys2.addEventListener('mousedown', onKeyClick)

tonalitySelector.addEventListener('mousedown', () => {
  document.querySelector('.tonalitiesContainer').classList.toggle('--visible')
});

tonalityButtons.forEach(button => button.addEventListener('mousedown', selectTonality))

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function selectTonality(e) {
  e.target.classList.toggle('--selected')
}

function onKeyClick(e) {
  const key = e.target.closest('button');
  key.classList.add("playing");

  // IF CHORD

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

  // IF NOTE
  
  // GLOW KEY
  const noteNumber = key.dataset.number
  const pianoKey = document.querySelector(`div[data-note="${tonalities[currentTonality][currentKey].notes[noteNumber]}"]`)
  pianoKey.classList.add('glowKey')
  setTimeout(() => pianoKey.classList.remove('glowKey'), 400)

  // PLAY AUDIO
  const audio = notes[tonalities[currentTonality][currentKey].notes[noteNumber]]
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => { key.classList.remove("playing") }, 100)

}

function onKeyDown(e) {
  
  if (!activeKeys.includes(e.code)) {
    return
  }

  if (alreadyPressed.includes(e.code)) return;
  alreadyPressed.push(e.code);

  let element = document.querySelector(`button[data-code="${e.code}"]`)
  element.classList.add('playing')

  // IF NOTE 

  if (document.querySelector(`button[data-code="${e.code}"]`).dataset.number) {

    const noteNumber = document.querySelector(`button[data-code="${e.code}"]`).dataset.number

    // GLOW KEY
    const pianoKey = document.querySelector(`div[data-note="${tonalities[currentTonality][currentKey].notes[noteNumber]}"]`)
    pianoKey.classList.add('glowKey')

    const audio = notes[tonalities[currentTonality][currentKey].notes[noteNumber]]
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => { pianoKey.classList.remove("playing") }, 100)
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
  key.classList.remove('playing', 'glowKey', 'glowChord', 'glowKey', 'chordIndicatorOn');

  // REMOVE KEY GLOW
  if (!chordKeys.includes(e.code)) {
    const noteNumber = document.querySelector(`button[data-code="${e.code}"]`).dataset.number
    const pianoKey = document.querySelector(`div[data-note="${tonalities[currentTonality][currentKey].notes[noteNumber]}"]`)
    pianoKey.classList.remove('glowKey')
  }

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
  key.classList.remove('playing', 'glowKey', 'glowChord', 'glowKey', 'chordIndicatorOn');
}

  changeBackground.addEventListener('transitionend', removeTransition);
  changeBackground.addEventListener('mousedown', function() {
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
  
  chords[letter].keys.map(key => document.querySelector(`div[data-note="${key}"`).classList.remove('glowChord'))
  chordElement.classList.remove('chordIndicatorOn');
}


  // FULL SCREEN BUTTON //

  /* Get the documentElement (<html>) to display the page in fullscreen */
let elem = document.documentElement;

let isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

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