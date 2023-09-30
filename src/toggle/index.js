class Toggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          display: flex;
          position: relative;
          align-items: center;
        }
        .pill {
          width: 48px;
          height: 24px;
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          border: 1px solid #1c304b;
          background: #fffff;
          transition: background-color .2s;
        }
        .input {
          appearance: none;
          width: 48px;
          height: 24px;
          border-radius: 12px;
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          margin: 0;
          -webkit-transform: scale(1);
          transform: scale(1);
          opacity: 0;
          -webkit-appearance: none;
          appearance: none;
        }
        .handle {
          top: 3px;
          left: 3px;
          width: 16px;
          height: 16px;
          border-radius: 16px;
          position: absolute;
          cursor: pointer;
          pointer-events: none;
          transition: .2s;
          background: #1c304b;
          z-index: 1;
          pointer-events: none;
        }
      .checked {
        background: var(--backgrounds-interactive-active);
        border: calc($unit / 8) solid var(--borders-dividers-interactive-hover);
      }

      </style>
      <div class="container">
        <label  for="test" class="pill"></label>
        <input for="test" class="input"></input>
        <span class="handle"></span>
      </div>
    `
    const pill = document.querySelector('label');
    pill.addEventListener('click', () => {
      console.log('hello workd')
      if (pill.classList.contains('checked')) {
        pill.classList.remove('checked');
      } else {
        pill.classList.add('checked');
      }
    })
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('tag-toggle', Toggle)
