export function generateMelody(quantumField) {
  const audioContext = new AudioContext();
  let currentTime = audioContext.currentTime;
  let frequencies = [];

  ['01', '12', '00'].forEach(pattern => {
    const count = (quantumField.match(new RegExp(pattern, 'g')) || []).length;
    frequencies.push(200 + count * 10);
  });

  frequencies.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(currentTime);
    oscillator.stop(currentTime + 5);
    currentTime += 5;
  });
}
