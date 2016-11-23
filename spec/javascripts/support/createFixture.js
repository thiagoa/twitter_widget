function createFixtureNode() {
  const fixture = document.createElement('div');

  fixture.id = 'fixture';
  fixture.destroy = function destroy() {
    this.parentNode.removeChild(fixture);
  };

  return fixture;
}

export default function createFixture({ html }) {
  const fixture = createFixtureNode();
  const body = document.querySelector('body');

  fixture.innerHTML = html;
  body.insertBefore(fixture, body.firstChild);

  return fixture;
}
