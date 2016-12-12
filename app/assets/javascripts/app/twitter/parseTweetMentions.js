function replaceMention(text, mention) {
  const regexp = new RegExp(`^@${mention}\\b|(\\s)@${mention}\\b`, 'g');
  const template = `$1<a href="#" data-js-mention>@${mention}</a>`;

  return text.replace(regexp, template);
}

export default function parseTweetMentions({ text, mentions }) {
  return mentions.reduce(replaceMention, text);
}
