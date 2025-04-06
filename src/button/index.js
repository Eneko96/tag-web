class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="css/styles.css">
    <button><slot></slot></button>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('tag-button', Button);
