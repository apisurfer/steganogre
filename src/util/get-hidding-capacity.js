export default function(width, height) {
  if (!width || !height) return 0;
  return width * height * 4;
};
