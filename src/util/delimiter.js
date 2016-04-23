export default function delimiter() {
  // 9 0xFF bytes to delimit message ending; 3pixels * 3 bytes(rgb)
  return [255, 255, 255, 255, 255, 255, 255, 255, 255]
}
