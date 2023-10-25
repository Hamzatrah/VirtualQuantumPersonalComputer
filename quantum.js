export function rollQuantumDie() {
  const faces = ['0', '1', '2'];
  return faces[Math.floor(Math.random() * 3)];
}
