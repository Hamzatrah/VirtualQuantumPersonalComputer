const STATES = ['alive', 'dead', 'asleep'];
let presidentOffice = Math.floor(Math.random() * 5) + 1;
let quantumStates = Array(5).fill(null).map(quantumDie);
let observerEffectApplied = false;

function quantumDie() {
    return STATES[Math.floor(Math.random() * STATES.length)];
}

function applyEntanglement(roomNumber) {
    if (roomNumber !== presidentOffice) {
        quantumStates[presidentOffice] = quantumStates[roomNumber];
    }
}

function applyObserverEffect() {
    observerEffectApplied = true;
    quantumStates = quantumStates.map(state => (Math.random() < 0.5) ? state : quantumDie());
}

function checkRoom(roomNumber) {
    if (!observerEffectApplied) applyObserverEffect();

    applyEntanglement(roomNumber - 1);
    let catState = quantumStates[roomNumber - 1];
    let message = `You checked Room ${roomNumber}. The cat is ${catState}.`;

    if (roomNumber === presidentOffice) {
        message = `You found the cat in the President's Office (Room ${roomNumber}). It is ${catState}.`;
    }

    document.getElementById('output').innerText = message;
}

// Additional logic for quantum phenomena can be added here
