class Notification extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const props = {
      closable: this.getAttribute('closable'),
      icon: this.getAttribute('icon'),
      status: this.getAttribute('status') ?? 'info',
      position: this.getAttribute('position') ?? 'fixed',
    };

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/styles.css">
      <style>
        .notification {
          box-shadow: var(--surface-2x);
          position: fixed;
          top: calc(3 * var(--unit));
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 75vw;
          background-color: var(--backgrounds-01);
          padding: calc(2 * var(--unit)) calc(2 * var(--unit)) calc(2 * var(--unit)) calc(3 * var(--unit));
          border-radius: var(--unit);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          z-index: 10;
        }

      .notification::before {
        content: '';
        width: var(--unit);
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }

      .notification.info::before {
        background-color: var(--icons-feedback-info);
      }
      .notification.warning::before {
        background-color: var(--icons-feedback-alert);
      }
      .notification.error::before {
        background-color: var(--icons-feedback-error);
      }
      .notification.read::before {
        background-color: var(--backgrounds-03);
      }
      .notification.success::before {
        background-color: var(--icons-feedback-success);
      }

        .close-button {
          position: absolute;
          top: calc(2 * var(--unit));
          top: 0;
          right: calc(2 * var(--unit));
          & span.material-icons {
            font-size: calc(2 * var(--unit));
          }

          & :hover {
            border: 0;
          }
        }


      .content {
        padding-left: calc(5 * var(--unit));
      }

        .ntf-icon {
    position: absolute;
    top: calc(2 * var(--unit));
    left: calc(3 * var(--unit));
    span.material-icons {
      color: var(--icons-01);
      font-size: calc(3 * var(--unit));
    }
  }}



      </style>

      <div class="notification">
      </div>
    `;

    const notificationEl = this.shadowRoot.querySelector('.notification');
    notificationEl.classList.add(props.status);
    notificationEl.style.position = props.position;

    if (props.closable) {
      const closeEl = document.createElement('button');
      closeEl.className = 'interactive close-button';
      closeEl.type = 'button';

      const mIcon = document.createElement('span');
      mIcon.className = 'material-icons';
      mIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M18 6l-12 12" />
  <path d="M6 6l12 12" />
</svg>


      `;

      closeEl.appendChild(mIcon);
      notificationEl.appendChild(closeEl);
    }

    const infoIcon = document.createElement('div');
    infoIcon.className = 'ntf-icon';
    const infoMi = document.createElement('span');
    infoMi.className = 'material-icons';
    infoMi.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" stroke-width="0" fill="currentColor" />
        </svg>
      `;
    infoIcon.appendChild(infoMi);
    notificationEl.appendChild(infoIcon);

    const content = document.createElement('div');
    content.className = 'content';
    content.innerHTML = '<slot></slot>';
    notificationEl.appendChild(content);
  }
}

customElements.define('tag-notification', Notification);
