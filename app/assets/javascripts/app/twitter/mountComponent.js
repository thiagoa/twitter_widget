export default function mountComponent(opts) {
  const containerNode = opts.containerNode;

  containerNode.innerHTML = `
    <div class="tweet"><p>Hi @dude!</p></div>
    <div class="tweet"><p>Pizza!</p></div>
  `;
}
