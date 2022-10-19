/* eslint-disable lit-a11y/click-events-have-key-events */
import { HostListener, HostListenerMixin } from "@adc/shared/src/HostListener";
import { ifNonNull } from "@adc/shared/src/ifNonNull";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./search.styles";
import type { TextInput } from "@aileron/text-input";
import type { PropertyValues, TemplateResult } from "lit";

export class Search extends HostListenerMixin(LitElement) {
  /**
   * @private
   */
  static styles = styles;

  /**
   * @private
   */
  static get eventBeforeClose(): string {
    return "adc-search-beingclosed";
  }

  /**
   * @private
   */
  static get eventClose(): string {
    return "adc-search-closed";
  }

  /**
   * "private" value that keeps track of the current value of the input.
   */
  _value = "";

  _suggestions: Record<"displayName" | "selectionName", string>[] = [];

  _searchValue = "";

  @query("adc-text-input") adcTextInput!: TextInput;

  items: any[] = [];
  announcedMessage = "";
  announceAvailableMessage = "";

  _matches: Record<"displayName" | "selectionName", string>[] = [];
  @property({ attribute: false }) highlight: HTMLElement | Element | undefined;
  @property({ attribute: false }) element;
  @property({ type: Boolean }) hoverChange = false;
  _configData: any[] = [];

  @property({
    type: String,
    hasChanged: (value?: string, oldValue?: string) => {
      return value !== oldValue;
    }
  })
  config;

  @property({ type: String, reflect: true }) list;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) validationMessage = "";
  @property({ type: String, reflect: true }) placeholder = "";
  @property({ type: Boolean }) autofocus = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) filterByDisplayName = false;
  @property({ type: Boolean }) spellcheck;
  @property({ type: Boolean, reflect: true }) invalid = false;
  @property({ attribute: "label-text" }) labelText = "";
  @property({ attribute: "validity-message" }) validityMessage = "";
  @property({ attribute: "of-translation" }) ofTranslation = "of";
  @property({ attribute: "result-available-translation" }) resultAvailableTranslation =
    "result is available";
  @property({ attribute: "results-available-translation" }) resultsAvailableTranslation =
    "results are available";
  @property({ attribute: "up-down-translation" }) upDownTranslation =
    "use up and down arrow keys to navigate";
  @property({ attribute: "hovered-translation" }) hoveredTranslation = "hovered";
  @property({ attribute: "option-translation" }) optionTranslation = "option";
  @property({ attribute: "clear-translation" }) clearTranslation = "Clear";
  @property({ type: Boolean, reflect: true }) clearInitiate = false;
  @property({ type: Boolean, reflect: true }) isComboBox = true;

  @property({ reflect: true })
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    const oldValue = this._value;
    this._value = value;

    this.requestUpdate("value", oldValue);
  }

  /**
   * @private
   * @param event.key, event.target
   */
  @HostListener("document:keydown")
  // @ts-expect-error - Not called because of @HostListener
  private readonly _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === "Esc" || key === "Escape" || key === "Tab") {
      this._handleUserInitiatedClose(target);
      this.clearInitiate = true;
      this.close();
      this._suggestions = [];
    }
  };

  @HostListener("blur")
  // @ts-expect-error - Not called because of @HostListener
  private _handleBlur() {
    this._suggestions = [];
    setTimeout(() => {
      this._suggestions = [];
      this._handleUserInitiatedClose(null);
    }, 300);
  }

  /**
   * @private
   * @param event
   */
  @HostListener("document:click")
  // @ts-expect-error - Not called because of @HostListener
  private readonly _handleClick = (event: MouseEvent) => {
    if (event.target !== this) {
      this._handleUserInitiatedClose(event.target);
      if (this.shadowRoot && event.composedPath().indexOf(this.shadowRoot) < 0) {
        this._handleUserInitiatedClose(event.target);
      }
    }
  };

  /**
   * @private
   * @param triggerBy
   */
  private _handleUserInitiatedClose(triggerBy: EventTarget | null) {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { triggerBy }
    };
    if (this.open) {
      if (
        this.dispatchEvent(
          new CustomEvent((this.constructor as typeof Search).eventBeforeClose, init)
        )
      ) {
        this._matches = [];
        this.close();
        this.dispatchEvent(new CustomEvent((this.constructor as typeof Search).eventClose, init));
      }
    }
  }

  /**
   * @private
   * @returns {TemplateResult}
   */
  private _renderItems() {
    return html`
      <div
        class="a11y-atomic-message"
        id="atomic-message"
        role="status"
        aria-atomic="true"
        aria-live="polite"
      >
        ${this.announcedMessage}
      </div>
      <adc-text-input
        id="search-input"
        ?disabled=${this.disabled}
        ?required=${this.required}
        label-text=${this.labelText}
        aria-describedby=${ifDefined(!this.invalid ? undefined : "validity-message")}
        aria-autocomplete="list"
        aria-controls="suggestions"
        aria-expanded=${this.open}
        aria-owns="suggestions"
        placeholder=${this.placeholder}
        validity-message=${ifNonNull(this.validityMessage)}
        @keyup=${this.filterList}
        @focus=${this.onFocus}
        ?readonly=${this.readonly}
        ?invalid=${this.invalid}
        ?isComboBox=${this.isComboBox}
        ?autofocus=${this.autofocus}
        value=${ifNonNull(this._value)}
        spellcheck=${this.spellcheck}
      ></adc-text-input>
      ${this.adcTextInput && this.adcTextInput.value === "" ? "" : this._renderClearIcon()}
      <ul role="listbox" id="suggestions" class="adc-search--options">
        ${this._matches.map(
          (item) => html`
            <li
              id="option--${this._matches.indexOf(item) + 1}"
              aria-selected=${item.selectionName === this._value}
              aria-setsize="${this._matches.length}"
              aria-posinset="${this._matches.indexOf(item) + 1}"
              role="option"
              class="adc-search--list"
              @click=${() => this.autocomplete(item)}
            >
              ${item.displayName}
            </li>
          `
        )}
      </ul>
    `;
  }

  protected render(): TemplateResult {
    return html` <div class="adc-search--search-input__wrapper">${this._renderItems()}</div> `;
  }

  autocomplete(item: Record<"selectionName", string>): void {
    this.adcTextInput.focus();
    this.adcTextInput.value = item.selectionName;
    this.clearInitiate = false;
    this.requestUpdate();
    this._handleUserInitiatedClose(null);
  }

  debounce(func, wait) {
    let timeout;

    return () => {
      const context = this;
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }
  debouncedAnnounceResults = this.debounce(() => this.announceResults(), 1000);
  debouncedAnnounceHover = this.debounce(() => this.announceHoverChange(), 200);
  hoverEvent = new CustomEvent("hoverEvent");
  resultsEvent = new CustomEvent("resultsEvent");

  isPrintableKeyCode(keyCode): boolean {
    return (
      (keyCode > 47 && keyCode < 58) || // number keys
      keyCode === 32 ||
      keyCode === 8 || // spacebar or backspace
      (keyCode > 64 && keyCode < 91) || // letter keys
      (keyCode > 95 && keyCode < 112) || // numpad keys
      (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
      (keyCode > 218 && keyCode < 223) // [\]' (in order)
    );
  }

  protected _renderClearIcon(): TemplateResult {
    return html`
      <div class="adc-search--container">
        <button
          part="button"
          aria-label="${this.clearTranslation}"
          class="adc-search__clear"
          @click="${this._handleClearInput}"
        >
          <adc-icon icon="action:close"></adc-icon>
        </button>
      </div>
    `;
  }

  _handleClearInput(): void {
    this.highlight = undefined;
    if (this.adcTextInput) {
      this.adcTextInput.value = "";
      this.suggest([]);
      this.announcedMessage = "";
      this.announceAvailableMessage = "";
      this.adcTextInput.shadowRoot?.querySelector("input")?.focus();
      this.requestUpdate();
    }
  }

  firstUpdated(changedProperties: PropertyValues): void {
    this.element = this.shadowRoot?.getElementById("suggestions");
    this.element.addEventListener("mouseover", this.clearActiveStyles);
    this.addEventListener("resultsEvent", this.debouncedAnnounceResults);
    this.addEventListener("hoverEvent", this.debouncedAnnounceHover);
    super.firstUpdated(changedProperties);
  }

  clearActiveStyles(): void {
    for (const child of this.children) {
      child.classList.remove("active");
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.config !== undefined) {
      this._configData = JSON.parse(this.config);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  updated(updateProperties: PropertyValues): void {
    if (!this.hoverChange && this.element.childElementCount) {
      for (const item of this.element.children) {
        item.classList.remove("active");
      }

      this.highlight = this.element.children[0];
      this.highlight!.classList.add("active");
    }
    super.updated(updateProperties);
  }

  _markPreviousElement(): void {
    if (this._matches.length) {
      if (!this.highlight || !this.highlight.previousElementSibling) {
        this.highlight = this.element.children[0];
        this.highlight!.classList.add("active");
        this.dispatchEvent(this.hoverEvent);
        return;
      }

      if (this.element) {
        this.highlight.classList.remove("active");

        this.highlight = this.highlight.previousElementSibling;

        if (this.highlight) {
          this.highlight.classList.add("active");
        }
        this.dispatchEvent(this.hoverEvent);
      }
    }
  }

  _markNextElement(): void {
    if (this._matches.length) {
      if (!this.highlight || !this.highlight.nextElementSibling) {
        this.highlight?.classList.remove("active");
        this.highlight = this.element.children[0];
        this.highlight!.classList.add("active");
        this.dispatchEvent(this.hoverEvent);
        return;
      }

      this.highlight.classList.remove("active");
      const nextHighlightEl = this.highlight.nextElementSibling;
      nextHighlightEl.classList.add("active");
      this.highlight = nextHighlightEl;
      this.dispatchEvent(this.hoverEvent);
    }
  }

  filterList(event): void {
    switch (event.key) {
      case "ArrowUp":
        this.hoverChange = true;
        event.preventDefault();
        event.stopPropagation();
        this._markPreviousElement();
        break;
      case "ArrowDown":
        this.hoverChange = true;
        event.preventDefault();
        event.stopPropagation();
        this._markNextElement();
        break;
      case "Enter":
        if (!this.clearInitiate) {
          this.hoverChange = false;
          if (this.highlight) {
            (this.highlight as HTMLElement).click();
          }
        }
        break;
      case "Escape":
        this.hoverChange = false;
        event.preventDefault();
        event.stopPropagation();
        this.close();
        break;
      default:
        this.hoverChange = false;
        this._suggestions = [];
        this._searchValue = event.target.value;
        if (this.isPrintableKeyCode(event.keyCode) && this._configData.length) {
          if (this._searchValue.length) {
            this.getSuggestion();
            setTimeout(() => {
              this.suggest(this._suggestions);
            }, 1000);
            return;
          }
          this._suggestions = [];
          this._handleClearInput();
          this.hoverChange = false;
        }
    }
  }

  getSuggestion(): void {
    this._suggestions = [];
    if (this._searchValue.length >= 3) {
      this._configData.forEach((element) => {
        if (element.displayName?.length > 0) {
          if (this.filterByDisplayName) {
            if (element.displayName?.toLowerCase().includes(this._searchValue?.toLowerCase())) {
              this._suggestions.push(element);
            }
          } else {
            this._suggestions.push(element);
          }
        }
      });
    }
  }

  suggest(suggestions: Record<"displayName" | "selectionName", string>[]): void {
    this._matches = suggestions || [];
    this._matches.length ? this.openSuggestion() : this.close();
    this.dispatchEvent(this.resultsEvent);
    this.requestUpdate();
  }

  openSuggestion(): void {
    if (this._matches.length) {
      this.open = true;
      this.clearInitiate = false;
    }
  }

  close(): void {
    this.open = false;
    this._searchValue = "";
  }

  willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has("config") && (this.config !== undefined || this.config !== "")) {
      this._configData = JSON.parse(this.config);
      this.getSuggestion();
      this.suggest(this._suggestions);
    }
    super.willUpdate(changedProperties);
  }

  announceResults(): void {
    if (this._matches.length < 1) {
      this.announcedMessage = "";
    } else if (this._matches.length === 1) {
      this.announcedMessage = `${this._matches.length} ${this.resultAvailableTranslation}. ${
        this.upDownTranslation
      }. ${this._matches[0]!.displayName} ${this.hoveredTranslation}`;
    } else {
      this.announcedMessage = `${this._matches.length} ${this.resultsAvailableTranslation}. ${
        this.upDownTranslation
      }. ${this._matches[0].displayName!} ${this.hoveredTranslation}`;
    }
    this.requestUpdate();
  }

  announceHoverChange(): void {
    this.announcedMessage = `${this.highlight!.textContent!} ${this.hoveredTranslation}.
      ${this.optionTranslation} ${this.highlight!.getAttribute("aria-posinet")!} ${
      this.ofTranslation
    }
      ${this.highlight!.getAttribute("aria-setsize")!}`;
    this.requestUpdate();
  }

  onFocus(): void {
    if (this.adcTextInput.value.length >= 3) {
      this._searchValue = this.adcTextInput.value;
      this.open = true;
      setTimeout(() => {
        this.getSuggestion();
        this.suggest(this._suggestions);
      }, 1000);
    }
  }
}

try {
  customElements.define("adc-search", Search);
} catch (e) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-search": Search;
  }
}
