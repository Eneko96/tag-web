class Avatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['src'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      .wrapper {
        display: flex;
        align-items: center;
        position: relative;
        cursor: default;
      }
      img {
        width: 56px;
        height: 56px;
        position: relative;
        border-radius: 50%;
        background-color: #ebebee;
      }
    </style>  
    <div class="wrapper">
      <img src=${this.getAttribute('src')}>
    </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}
customElements.define('tag-avatar', Avatar);
