class Loader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      div {
        height: 16px;
        width: 16px;
        position: relative;

      }

      div::before {
        content: "";
        position: absolute;
        left: 0;
        height: 100%;
        width: 100%;
        border: 2px solid #ebebee;
        border-radius: 50%;
      }

      div::after {
        content: "";
        position: absolute;
        left: 0;
        height: 100%;
        width: 100%;
        border: 2px solid rgba(0,0,0,0);
        border-radius: 50%;
        border-top-color: #009acc;
        border-left-color: #009acc;
        -webkit-animation: spin 1s infinite linear;
        animation: spin 1s infinite linear;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
  }
    </style>
    <div></div>
    `
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('tag-loader', Loader)
