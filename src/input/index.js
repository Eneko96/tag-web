class Input extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'value' && this.shadowRoot) {
      const input = this.shadowRoot.querySelector('input');
      if (input) input.value = newVal;
    }
  }

  render() {
    const value = this.getAttribute('value') ?? '';
    const label = this.getAttribute('label') ?? '';
    const helper = this.getAttribute('helper') ?? '';
    this.shadowRoot.innerHTML = `
  <style>
  .input {
    appearance: none;
    outline: 0;
    width: 100%;
    max-width: inherit;
    background: var(--backgrounds-01);
    border: calc(var(--unit) / 8) solid var(--borders-dividers-interactive-enabled);
    border-radius: var(--unit);
    padding: var(--unit) calc(2 * var(--unit)) var(--unit) calc(2 * var(--unit));
    max-height: calc(5 * var(--unit));
  }
  .input:placeholder {
    color: var(--text-01);
  }
  .input:active,
  .input:focus-visible {
    border: calc(var(--unit) / 8) solid var(--borders-dividers-interactive-active);
  }
  .input:disabled {
    border: calc(var(--unit)/ 8) solid var(--borders-dividers-interactive-disabled);
    color: var(--text-03);
    cursor: none;
    pointer-events: none;
  }

  .caption {
    font-family: var(--caption-font-family);
    font-weight: var(--caption-font-weight);
    line-height: var(--caption-line-height);
    font-size: var(--caption-font-size);
    letter-spacing: var(--caption-letter-spacing);
    -webkit-text-decoration: var(--caption-text-decoration);
    text-decoration: var(--caption-text-decoration);

    display: block;
    margin: 0;
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
    margin-top: 8px;
    color: var(--text-01);
  }

  </style>
  `;

    const wrapper = document.createElement('div');

    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'caption';
      labelEl.textContent = label;
      wrapper.appendChild(labelEl);
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.className = 'input';
    inputEl.value = value;
    inputEl.placeholder = 'placeholder';
    wrapper.appendChild(inputEl);

    if (helper) {
      const helperEl = document.createElement('p');
      helperEl.className = 'helper';
      helperEl.textContent = helper;
      wrapper.appendChild(helperEl);
    }

    this.shadowRoot.appendChild(wrapper);
  }

  get value() {
    const input = this.shadowRoot.querySelector('input');
    return input ? input.value : (this.getAttribute('value') ?? '');
  }

  set value(val) {
    this.shadowRoot.querySelector('input').value = val;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('tag-input', Input);
