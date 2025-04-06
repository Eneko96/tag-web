const STATIC_PROPS = {
  pill: {
    className: 'pill',
  },
  input: {
    className: 'input',
    type: 'checkbox',
  },
  handle: {
    className: 'handle',
  },
  helper: {
    className: 'helper',
  },
};

class Toggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render() {
    const props = {
      id: this.getAttribute('id') || 'toggle-id',
      name: this.getAttribute('name') || '',
      helper: this.getAttribute('helper') || '',
    };

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
        .pill:hover {
          border: calc(var(--unit) / 8) solid var(--borders-dividers-interactive-hover);
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
          top: 50%;
          transform: translateY(-50%);
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
          border: calc(var(--unit) / 8) solid var(--borders-dividers-interactive-hover);
        }

        .pill.checked > .handle {
          left: calc(100% - 3px);
          transform: translate(-100%, -50%);
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
          background: var(--surface-interactive-default);
        }
        .helper {
          font-family: var(--body-small-font-family);
          font-weight: var(--body-small-font-weight);
          line-height: var(--body-small-line-height);
          font-size: var(--body-small-font-size);
          letter-spacing: var(--body-small-letter-spacing);
          text-transform: var(--body-small-text-case);
          -webkit-text-decoration: var(--body-small-text-decoration);
          text-decoration: var(--body-small-text-decoration);
          margin-left: 8px;
          color: var(--text-02);
        }
      </style>

      <div class="container">
      </div>
    `;
    const container = this.shadowRoot.querySelector('.container');
    const pillEl = document.createElement('label');
    const inputId = props.id + '-input';

    pillEl.className = STATIC_PROPS.pill.className;
    pillEl.id = props.id;
    pillEl.htmlFor = inputId;
    container.appendChild(pillEl);

    const inputEl = document.createElement('input');
    inputEl.className = STATIC_PROPS.input.className;
    inputEl.type = STATIC_PROPS.input.type;
    inputEl.checked = false;
    inputEl.name = props.name;
    inputEl.id = inputId;
    pillEl.appendChild(inputEl);

    const handleEl = document.createElement('span');
    handleEl.className = STATIC_PROPS.handle.className;
    pillEl.appendChild(handleEl);

    if (props.helper) {
      const helperEl = document.createElement('label');
      helperEl.className = STATIC_PROPS.helper.className;
      helperEl.textContent = props.helper;
      helperEl.htmlFor = inputId;
      container.appendChild(helperEl);
    }

    inputEl.addEventListener('input', (evt) => this.handleInputChange(evt));
  }

  handleInputChange(evt) {
    const inputEl = evt.target;
    const pillEl = inputEl.closest('.pill');
    if (inputEl.checked) {
      pillEl.classList.add('checked');
    } else {
      pillEl.classList.remove('checked');
    }
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    const pillEl = this.shadowRoot.querySelector('.pill');
    pillEl.removeEventListener('click', this.handlePillClick.bind(this));
  }
}

customElements.define('tag-toggle', Toggle);
