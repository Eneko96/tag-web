class Dropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  static get observedAttributes() {
    return ['list'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const list = JSON.parse(this.getAttribute('list'));
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="css/styles.css">
      <style>
      .container {
          width: auto;
          max-width: 100%;
          height: -webkit-min-content;
          height: min-content;
          position: relative;
          display: inline-block;
      }
      .menu {
        position: fixed;
        z-index: 2;
        float: left;
        transform: translateY(0.5rem);
        min-width: -webkit-max-content;
        min-width: max-content;
        max-height: 240px;
        padding: 0;
        margin: 0;
        overflow-y: auto;
        text-align: left;
        background: white;
        border: none;
        border-radius: 8px;
        box-shadow: 4px 2px 16px 0px #1c304b14;
      }
      .item {
        position: relative;
        cursor: pointer;
        padding: 8px 32px 8px 16px;
        margin: 0;
        -webkit-appearance: none;
        appearance: none;
        outline: 0;
        white-space: normal;
        color: #1c304b;
      }
      .item:hover {
        background-color: #f8f8f9;
      }
      .menu::-webkit-scrollbar {
        width: 22px;
      }
      .menu::-webkit-scrollbar-thumb {
        background: rgb(45,123,158);
        border-radius: 28px;
        border: 8px solid rgba(0,0,0,0);
        background-clip: padding-box;
      }
      </style>
    <div class="container">
      <button class="button">
        <slot></slot>
      </button>
      <div class="menu" style="display: none;">
         ${list.map(el => `<div class="item">${el}</div>`).join('')}
      </div>
    </div>
    `
    const button = this.shadowRoot.querySelector('button');
    const menu = this.shadowRoot.querySelector('.menu');
    requestAnimationFrame(() => {
      const buttonWidth = getComputedStyle(button).getPropertyValue('width');
      menu.style.width = buttonWidth;

    })
    button.addEventListener('click', this.toggleMenu);
  }

  toggleMenu() {
    const menu = this.shadowRoot.querySelector('.menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none'
  }

  connectedCallback() {
    this.render();
  }

  disconnecedCallback() {
    const button = this.shadowRoot.querySelector('.button');
    button.removeEventListener('click', this.toggleMenu)
  }
}

customElements.define('tag-dropdown', Dropdown)
