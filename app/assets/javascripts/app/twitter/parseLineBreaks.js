export default function parseLineBreaks(text) {
  return text.replace(/\n/g, '<br>');
}
