export default function renderOneTweet(tweet) {
  return `
    <article class="tweet">
      <header>${tweet.created_at}</header>
      ${tweet.text}
    </article>
  `;
}
