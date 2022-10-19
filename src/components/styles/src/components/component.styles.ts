import { css } from "lit";
import { lightThemeStyles } from "../themes/light.styles";

export const componentStyles = css`
  ${lightThemeStyles}

  :root,
  :host {
    --spacing-20: 1.25rem;
    --animation-speed: 50ms;
    --animation-easing: ease-in;
  }

  :root [disabled],
  :host [disabled] {
    --color-light-mode-interactive-disabled: #b4c1cf;
  }

  :host {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  :host(.focus-visible),
  :host(:focus-within) {
    border-radius: var(--radius-sm);
    outline-offset: 2px;
    outline: 2px solid var(--color-light-mode-interactive-focus-outline-focus);
  }

  :host *:focus-visible {
    outline: none;
  }

  [hidden] {
    display: none !important;
  }

  [disabled] {
    pointer-events: none;
  }

  :host .sr-only {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;
