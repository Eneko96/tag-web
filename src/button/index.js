class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="css/styles.css">
    <button><slot></slot></button>
    `
  }

  connectedCallback() {
    const lightDOM = this.textContent;
    console.log(lightDOM)
  }
}

customElements.define('tag-button', Button);
