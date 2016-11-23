export default function renderOneTweet(tweet) {
  return `
    <article class="tweet">
      <header>${tweet.created_at}</header>
      <p>${tweet.text}</p>
    </article>
  `;
}
