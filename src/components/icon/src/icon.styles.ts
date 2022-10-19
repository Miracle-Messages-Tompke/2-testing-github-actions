import { css } from "lit";

export default css`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(359deg);
    }

    51% {
      transform: rotate(0deg);
    }

    75% {
      transform: rotate(134deg);
    }

    100% {
      transform: rotate(359deg);
    }
  }

  :host {
    fill: currentcolor;
    color: inherit;
    display: inline-flex;
    pointer-events: none;
    vertical-align: text-top;
  }

  :host(:not(:root)) {
    overflow: hidden;
  }

  :host([icon="action:loader"]) svg path:last-of-type {
    animation: spin 0.8s cubic-bezier(0.17, 0.67, 1, 1) infinite;
    transform-origin: center;
  }

  @media (forced-colors: active) {
    .aileron-icon,
    :host {
      forced-color-adjust: auto;
    }
  }

  #container {
    height: 100%;
  }

  img,
  svg,
  ::slotted(*) {
    vertical-align: top;
  }

  svg path {
    fill: var(--icon-fill, var(--color-light-mode-icon-icon-interactive));
  }
`;
