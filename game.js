const STATES = ['alive', 'dead', 'asleep'];
let presidentOffice = Math.floor(Math.random() * 5) + 1;
let quantumStates = Array(5).fill(null).map(quantumDie);
let observerEffectApplied = false;
const RELATIVITY_ROOM = 4;  // Example room for relativity effects
const PHOTON_BOX_ROOM = 5;  // Example room for photon box experiment

function quantumDie() {
    return STATES[Math.floor(Math.random() * STATES.length)];
}

function applyObserverEffect() {
    observerEffectApplied = true;
    quantumStates = quantumStates.map(state => (Math.random() < 0.5) ? state : quantumDie());
}

function relativityRoomEffect() {
    // Simulate time dilation effect
    let timeDilationFactor = Math.random() + 0.5; // Random factor between 0.5 and 1.5
    return `Relativity Room: Time dilation factor applied is ${timeDilationFactor.toFixed(2)}.`;
}

function photonBoxExperiment() {
    let energyState = Math.random() > 0.5 ? 'high' : 'low';
    return `Photon Box: The photon's energy state is detected as ${energyState}.`;
}

function checkRoom(roomNumber) {
    if (!observerEffectApplied) applyObserverEffect();

    let catState = quantumStates[roomNumber - 1];
    let message = `You checked Room ${roomNumber}. The cat is ${catState}.`;

    // Apply Einstein-themed logic
    if (roomNumber === RELATIVITY_ROOM) {
        message += `\n${relativityRoomEffect()}`;
    } else if (roomNumber === PHOTON_BOX_ROOM) {
        message += `\n${photonBoxExperiment()}`;
    }

    if (roomNumber === presidentOffice) {
        message = `You found the cat in the President's Office (Room ${roomNumber}). It is ${catState}.`;
    }

    document.getElementById('output').innerText = message;
}
