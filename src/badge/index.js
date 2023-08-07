const colors = {
  success: '#73d85a',
  error: '#e87a71',
  default: '#33cdff'
}

class Badge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      span {
        height: 16px;
        min-width: 16px;
        padding: 0 4px;
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: ${colors[this.getAttribute('type')] || colors.default};
        color: #1c304b;
        border-radius: 24px;
        font-weight: 500;
        line-height: 16px;
        font-size: 12px;
        letter-spacing: 5%;
      }
    </style>
    <span>
      <slot></slot>
    </span>
    `
  }

  connectedCallback() {
    this.render();
  }
}
customElements.define('tag-badge', Badge);
