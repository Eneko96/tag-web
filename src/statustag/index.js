class StatusTag extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['status'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const status = this.getAttribute('status');
    this.shadowRoot.innerHTML = `
      <style>
        .status-tag {
          font-family: var(--tag-font-family);
          font-weight: var(--tag-font-weight);
          line-height: var(--tag-line-height);
          font-size: var(--tag-font-size);
          letter-spacing: var(--tag-letter-spacing);
          -webkit-text-decoration: var(--tag-text-decoration);
          text-decoration: var(--tag-text-decoration);

          position: relative;
          display: inline flex;
          align-items: center;
          justify-content: center;
          border: 0;
          pointer-events: none;
          padding: calc(var(--unit) / 2) calc(2 * var(--unit));
          background-color: var(--surface-feedback-info);
          color: var(--text-01);
          border-radius: calc(2 * var(--unit));
        }

        .success {
          background-color: var(--surface-feedback-success);
        }

        .error {
          background-color: var(--surface-feedback-error); 
        }

        .warning {
          background-color: var(--surface-feedback-alert);
        }

      </style>

      <div class="status-tag ${status}">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('tag-status-tag', StatusTag);
