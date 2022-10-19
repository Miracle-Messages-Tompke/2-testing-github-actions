/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HostListener, HostListenerMixin } from "@adc/shared/src/HostListener";
import "@aileron/icon";
import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./carousel.styles";
import sameHeight from "./sameHeight.js";
import type { TemplateResult } from "lit";

// TODO: stubs to fix pesky dependencies that probably aren't necessary
const prefix = "bx";

// max time allowed to do swipe
const MAX_GESTURE_DURATION = 300;

// min distance traveled to be considered swipe
const MIN_DISTANCE_TRAVELLED = 75;

// tag constants used for same height calculations
const headingBottomMargin = 64;

/**
 * Carousel.
 *
 * @element adc-carousel
 * @csspart prev-button The button to go to the previous page.
 * @csspart next-button The button to go to the next page.
 */
export class Carousel extends HostListenerMixin(LitElement) {
  /**
   * The scrolling contents node.
   */
  @query(`.${prefix}--carousel__scroll-contents`)
  private readonly _contentsNode?: HTMLElement;

  /**
   * The width of the scroll contents area node, excluding one of overflowed
   * contents.
   */
  @state() private _contentsBaseWidth = 0;

  /**
   * The gap width between each card.
   */
  @state() private _gap = 0;

  /**
   * Array to hold the card-heading elements within child items.
   */
  private _childItems: any[] = [];

  /**
   * Array to hold the card-heading elements within child items.
   */
  private readonly _childItemHeadings: any[] = [];

  /**
   * Array to hold the card-eyebrow elements within child items.
   */
  private readonly _childItemEyebrows: any[] = [];

  /**
   * Array to hold the tag-group elements within child items.
   */
  private readonly _childItemTagGroup: any[] = [];

  /**
   * Array to hold the paragraph elements within child items.
   */
  private readonly _childItemParagraphs: any[] = [];

  /**
   * Array to hold the card-cta-footer elements within child items.
   */
  private readonly _childItemFooters: any[] = [];

  /**
   * The observer for the resize of the scroll container.
   */
  private _observerResizeContainer: any | null = null;

  /**
   * The observer for the resize of the viewport.
   */
  private _observerResizeRoot: any | null = null;

  /**
   * The page size that is explicitly set.
   */
  @state() private _pageSize?: number;

  /**
   * The page size that is automatically calculated upon viewport size
   * via `--dds--carousel--page-size` CSS custom property.
   * If `page-size` attribute is set, this value is ignored.
   */
  @state() private _pageSizeAuto = 1;

  /**
   * The default slot.
   */
  @query("slot:not([name])") private readonly _slotNode?: HTMLSlotElement;

  /**
   * The number of total items.
   */
  @state() private _total = 0;

  /**
   * Initial touch position (used to detect swipe gesture)
   */
  @state() private _startPos = 0;

  /**
   * Initial touch time (used to detect swipe gesture)
   */
  @state() private _startTime = 0;

  /**
   * Cleans-up and creats the resize observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateObserverResize({ create }: { create?: boolean } = {}) {
    const { _contentsNode: contentsNode } = this;
    if (contentsNode) {
      if (this._observerResizeContainer) {
        this._observerResizeContainer.disconnect();
        this._observerResizeContainer = null;
      }
      if (this._observerResizeRoot) {
        this._observerResizeRoot.disconnect();
        this._observerResizeRoot = null;
      }
      if (create) {
        this._observerResizeRoot = new ResizeObserver(this._observeResizeRoot);
        this._observerResizeRoot.observe(this.ownerDocument?.documentElement);
        this._observerResizeContainer = new ResizeObserver(this._observeResizeContainer);
        this._observerResizeContainer.observe(contentsNode);
      }
    }
  }

  /**
   * Stops the container from scrolling when focusing on a card outside of the
   * viewport.
   *
   * @param event The event.
   */
  // eslint-disable-next-line class-methods-use-this
  private _handleScrollFocus({ target }: Event) {
    (target as HTMLElement).scrollTo(0, 0);
  }

  /**
   * Handles card focus throughout pages.
   *
   * @param event The event.
   */
  @HostListener("shadowRoot:focusin")
  // @ts-expect-error: The decorator refers to this method but TS thinks this method
  // is not referred to
  private readonly _handleFocus = ({ target }: FocusEvent) => {
    const containsCurrent = target !== this && this.contains(target as HTMLElement);
    let currentItemIndex = 0;
    Array.from(this.children).forEach((carouselItem, index) => {
      if (carouselItem.contains(target as HTMLElement)) {
        currentItemIndex = index;
      }
    });

    // Calculates proper page to display if focus is outside the current page
    if (
      containsCurrent &&
      (currentItemIndex < this.start || currentItemIndex >= this.start + this.pageSize)
    ) {
      // The `currentIndex` floored by `pageSize`
      const nextStart = Math.floor(currentItemIndex / this.pageSize) * this.pageSize;
      const pageOffset = this.start % this.pageSize;

      // Ensures the page moves by `this.pageSize` in either direction
      this.start = nextStart + pageOffset;
    }
  };

  /**
   * Handles `click` event on the next button.
   */
  private _handleClickNextButton() {
    const { pageSize, start, _total: total } = this;
    this.start = Math.min(start + pageSize, total - 1);
  }

  /**
   * Handles `click` event on the prev button.
   */
  private _handleClickPrevButton() {
    const { pageSize, start } = this;
    this.start = Math.max(start - pageSize, 0);
  }

  /**
   * Handles toggle of playback
   */
  private _handleTogglePlayback() {
    this.isPlaying = !this.isPlaying;

    const _advanceCarousel = (): void => {
      const { pageSize, start, _total: total } = this;
      // console.log('page size: '+ pageSize + ' | start: ' + start + ' | total:
      // ' + total);

      if (start + pageSize >= total) {
        // starting value plus size of page minus one is greater than or equal
        // to total, reset
        this.start = 0;
      } else {
        // else advance start as usual
        this.start = Math.min(start + pageSize, total - 1);
      }
    };

    if (this.isPlaying) {
      this.playCarousel = setInterval(_advanceCarousel, this.slideDelay);
    } else {
      clearInterval(this.playCarousel);
      this.playCarousel = null;
    }
  }

  /**
   * Handles `touchstart` event.
   */
  private _handleTouchStartEvent(event: TouchEvent) {
    this._startPos = event.touches[0].clientX;
    this._startTime = new Date().getTime();
  }

  /**
   * Handles `touchend` event.
   */
  private _handleTouchEndEvent(event: TouchEvent) {
    const { _startPos, _startTime } = this;
    const { pageSize, start, _total: total } = this;

    // distance travelled
    const distTravelled = event.changedTouches[0].clientX - _startPos;
    // elapsed time
    const elapsedTime = new Date().getTime() - _startTime;

    if (elapsedTime <= MAX_GESTURE_DURATION && Math.abs(distTravelled) >= MIN_DISTANCE_TRAVELLED) {
      if (distTravelled < 0) {
        this.start = Math.min(start + pageSize, total - 1);
      } else {
        this.start = Math.max(start - pageSize, 0);
      }
    }
  }

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const { name } = slot;
    if (!name) {
      this._total = slot
        .assignedNodes()
        .filter((node) => node.nodeType === Node.ELEMENT_NODE).length;
    }
    this._updateGap();

    this._childItems = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches?.((this.constructor as typeof Carousel).selectorItem)
      );

    // retrieve item heading, eyebrows, and footers to set same height
    if (this._childItems) {
      this._childItems.forEach((e) => {
        this._childItemEyebrows.push(
          (e as HTMLElement).querySelector(
            (this.constructor as typeof Carousel).selectorItemEyebrow
          )
        );
        this._childItemParagraphs.push(
          (e as HTMLElement).querySelector(
            (this.constructor as typeof Carousel).selectorItemParagraph
          )
        );
        this._childItemTagGroup.push(
          (e as HTMLElement).querySelector(
            (this.constructor as typeof Carousel).selectorItemTagGroup
          )
        );
        this._childItemHeadings.push(
          (e as HTMLElement).querySelector(
            (this.constructor as typeof Carousel).selectorItemHeading
          )
        );
        this._childItemFooters.push(
          (e as HTMLElement).querySelector((this.constructor as typeof Carousel).selectorItemFooter)
        );
      });
    }
  }

  /**
   * The observer for the resize of the scroll container.
   */
  private readonly _observeResizeContainer = (records) => {
    const { contentRect } = records[records.length - 1];
    const { width: contentsBaseWidth } = contentRect;
    this._contentsBaseWidth = contentsBaseWidth;
    this._updateGap();
  };

  /**
   * The observer for the resize of the viewport.
   */
  private readonly _observeResizeRoot = () => {
    const { customPropertyPageSize } = this.constructor as typeof Carousel;
    const { _contentsNode: contentsNode } = this;
    const { defaultView: w } = this.ownerDocument;
    this._pageSizeAuto = parseFloat(
      w!.getComputedStyle(contentsNode!).getPropertyValue(customPropertyPageSize)
    );
    this._setSameHeight();
  };

  /**
   * @returns Page status text.
   */
  private _renderStatus() {
    const { start, pageSize, formatStatus, _total: total } = this;
    // Copes with the condition where `start % pageSize` is non-zero
    const pagesBefore = Math.ceil(start / pageSize);
    const pagesSince = Math.ceil((total - start) / pageSize);

    return formatStatus({
      currentPage: Math.ceil(start / pageSize) + 1,
      pages: pagesBefore + pagesSince
    });
  }

  /**
   * @returns either the play or pause icon depending on isPlaying state
   */
  private _getPlayPauseButton() {
    if (this.isPlaying) {
      return html`<adc-icon icon="small:pause"></adc-icon>`;
    }
    return html`<adc-icon icon="small:play"></adc-icon>`;
  }

  /**
   *
   * @returns the playback toggle button and icon
   */
  private _renderToggleControl(handleTogglePlayback) {
    return html`
      <button
        class="${prefix}--btn ${prefix}--btn--secondary ${prefix}--btn--icon-only ${prefix}--carousel__navigation__btn"
        @click="${handleTogglePlayback}"
      >
        ${this._getPlayPauseButton()}
      </button>
    `;
  }

  private readonly _setSameHeight = () => {
    // check if items are not null before using sameHeight
    sameHeight(
      this._childItemEyebrows.filter((item) => item !== null),
      "sm"
    );
    sameHeight(
      this._childItemHeadings.filter((item) => item !== null),
      "sm"
    );
    sameHeight(
      this._childItemParagraphs.filter((item) => item !== null),
      "sm"
    );
    sameHeight(
      this._childItemFooters.filter((item) => item !== null),
      "sm"
    );

    let tagGroupHeight = 0;

    // get tallest height of tag groups
    this._childItemTagGroup.forEach((item) => {
      if (item) {
        const groupHeight = (item as HTMLElement).offsetHeight;
        if (groupHeight > tagGroupHeight) {
          tagGroupHeight = groupHeight;
        }
      }
    });

    this._childItemHeadings.forEach((e) => {
      // add tag group height to heading to the cards lacking tag group
      if (
        e &&
        !e.nextElementSibling?.matches((this.constructor as typeof Carousel).selectorItemTagGroup)
      ) {
        e.style.marginBottom = `${tagGroupHeight + headingBottomMargin}px`;
      }
    });
  };

  /**
   * Calculates the width between cards.
   */
  private _updateGap() {
    const { _contentsNode: contentsNode, _slotNode: slotNode } = this;
    const elems = slotNode!.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE);
    this._gap =
      elems.length <= 1
        ? 0
        : (contentsNode!.scrollWidth -
            elems.reduce((acc, elem) => acc + ((elem as HTMLElement).offsetWidth ?? 0), 0)) /
          (elems.length - 1);
  }

  /**
   * The formatter for the pagination status. Should be changed upon the locale
   * the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatus = ({ currentPage, pages }: { currentPage: number; pages: number }): string =>
    `${currentPage} / ${pages}`;

  /**
   * Number of items per page.
   * If `--dds--carousel--page-size` CSS custom property is set to `<div
   * class="bx--carousel__scroll-container">` or its ancestor (e.g. the host
   * `<dds-carousel>`), this is set automatically from
   * `--dds--carousel--page-size`.
   */
  @property({ type: Number, attribute: "page-size" })
  get pageSize(): number {
    const { _pageSize: pageSize, _pageSizeAuto: pageSizeAuto } = this;
    return pageSize ?? pageSizeAuto;
  }

  set pageSize(value: number) {
    this._pageSize = value;
    // Don't call `.requestUpdate()` here given we track updates via `_pageSize`
    // and `_pageSizeAuto`
  }

  /**
   * The assistive text for the button to go to next page.
   */
  @property({ attribute: "next-button-text" }) nextButtonText = "Next item";

  /**
   * The assistive text for the button to go to previous page.
   */
  @property({ attribute: "prev-button-text" }) prevButtonText = "Previous item";

  /**
   * The boolean to determine if Carousel has a playback control
   */
  @property({ type: Boolean, reflect: true }) isPlayable = false;

  /**
   * The boolean to track if playable Carousel is currently playing
   */
  @property({ type: Boolean }) isPlaying = false;

  @property() playCarousel;
  /**
   * The current zero-based index of the left-most card.
   */
  @property({ type: Number }) start = 0;

  /**
   * The number of milliseconds to delay when changing slides
   */
  @property({ type: Number, reflect: true }) slideDelay = 2000;

  connectedCallback(): void {
    super.connectedCallback();
    this._cleanAndCreateObserverResize({ create: true });
  }

  disconnectedCallback(): void {
    this._cleanAndCreateObserverResize();
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this._cleanAndCreateObserverResize({ create: true });
  }

  render(): TemplateResult {
    const { customPropertyPageSize } = this.constructor as typeof Carousel;
    const {
      nextButtonText,
      pageSize,
      prevButtonText,
      start,
      _contentsBaseWidth: contentsBaseWidth,
      _gap: gap,
      _pageSize: pageSizeExplicit,
      _total: total,
      _handleClickNextButton: handleClickNextButton,
      _handleClickPrevButton: handleClickPrevButton,
      _handleScrollFocus: handleScrollFocus,
      _handleSlotChange: handleSlotChange,
      _handleTouchStartEvent: handleTouchStartEvent,
      _handleTouchEndEvent: handleTouchEndEvent,
      _handleTogglePlayback: handleTogglePlayback
    } = this;
    // Copes with the condition where `start % pageSize` is non-zero
    const pagesBefore = Math.ceil(start / pageSize);
    const pagesSince = Math.ceil((total - start) / pageSize);
    // Use another div from the host `<adc-carousel>` to reflect private state
    return html`
      <div
        class="${prefix}--carousel__scroll-container"
        @scroll="${handleScrollFocus}"
        @touchstart="${handleTouchStartEvent}"
        @touchend="${handleTouchEndEvent}"
        style=${pageSizeExplicit ? `${customPropertyPageSize}:  ${pageSizeExplicit}` : ""}
      >
        <div
          class="${prefix}--carousel__scroll-contents"
          style="left:${(-start * (contentsBaseWidth + gap)) / pageSize}px"
        >
          <slot @slotchange="${handleSlotChange}"></slot>
        </div>
      </div>
      <div class="${prefix}--carousel__navigation">
        ${this.isPlayable ? this._renderStatus() : null}
        <button
          part="prev-button"
          class="${prefix}--btn ${prefix}--btn--secondary ${prefix}--btn--icon-only ${prefix}--carousel__navigation__btn"
          ?disabled="${pagesBefore === 0}"
          @click="${handleClickPrevButton}"
          aria-label="${ifDefined(prevButtonText)}"
          title="${ifDefined(prevButtonText)}"
        >
          <adc-icon icon="navigation:arrow-left"></adc-icon>
        </button>
        ${this.isPlayable ? this._renderToggleControl(handleTogglePlayback) : this._renderStatus()}
        <button
          part="next-button"
          class="${prefix}--btn ${prefix}--btn--secondary ${prefix}--btn--icon-only ${prefix}--carousel__navigation__btn"
          ?disabled="${pagesSince <= 1}"
          @click="${handleClickNextButton}"
          aria-label="${ifDefined(nextButtonText)}"
          title="${ifDefined(nextButtonText)}"
        >
          <adc-icon icon="navigation:arrow-right"></adc-icon>
        </button>
      </div>
    `;
  }

  /**
   * The CSS custom property name for the live page size.
   * If the CSS custom property is set to `<div
   * class="bx--carousel__scroll-container">` or its ancestor (e.g. the host
   * `<dds-carousel>`), this is set automatically from the CSS custom property.
   */
  static get customPropertyPageSize(): string {
    return '--adc--carousel--page-size';
  }

  /**
   * The selector for the card component
   */
  static get selectorItem(): string {
    return 'adc-card';
  }

  /**
   * A selector that will return the card item's eyebrow
   */
  static get selectorItemEyebrow(): string {
    return 'adc-card-eyebrow';
  }

  /**
   * A selector that will return the card item's tag group
   */
  static get selectorItemTagGroup(): string {
    return 'adc-tag-group';
  }

  /**
   * A selector that will return the card item's tag group
   */
  static get selectorItemParagraph(): string {
    return "p";
  }

  /**
   * A selector that will return the card item's heading
   */
  static get selectorItemHeading(): string {
    return 'adc-card-heading';
  }

  /**
   * A selector that will return the card item's footer
   */
  static get selectorItemFooter(): string {
    return 'adc-card-cta-footer';
  }

  static get stableSelector(): string {
    return 'adc--carousel';
  }

  static styles = styles;
}

try {
  customElements.define('adc-carousel', Carousel);
} catch (error) {
  // do nothing
}

declare global {
  interface HTMLElementTagNameMap {
    "adc-carousel": Carousel;
  }
}
