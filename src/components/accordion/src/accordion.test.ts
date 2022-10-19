import "@aileron/accordion";

global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;

describe("accessibility tests", () => {
  it("should be accessible", () => {
    document.body.innerHTML = `
    <h1>Custom element test</h1>
    <adc-accordion>
      <adc-accordion-item
        label-text="part 1"
      >
        Accordion
      </adc-accordion-item>
    </adc-accordion>`;
    const accordion = document.querySelector("adc-accordion");

    expect(accordion?.nodeType).toBe(1);
  });
});

describe("when no properties are written", () => {
  document.body.innerHTML = `
  <h1>Custom element test</h1>
  <adc-accordion>
    <adc-accordion-item
      label-text="part 1"
    >
      Accordion
    </adc-accordion-item>
  </adc-accordion>`;
  const accordionItem = document.querySelector("adc-accordion-item");

  it("should have correct default values", () => {
    expect(accordionItem?.disabled).toBe(false);
    expect(accordionItem?.open).toBe(false);
    expect(accordionItem?.labelPosition).toBe("right");
  });

  it("should render as a <button>", () => {
    const element = accordionItem?.shadowRoot?.querySelector("button");

    expect(element).not.toBeNull();
  });
});

describe("when disabled", () => {
  document.body.innerHTML = `
  <h1>Custom element test</h1>
  <adc-accordion disabled>
    <adc-accordion-item
      label-text="part 1"
      disabled
    >
      Accordion
    </adc-accordion-item>
  </adc-accordion>`;
  const accordionItem = document.querySelector("adc-accordion-item");

  it("should be accessible", () => {
    expect(accordionItem?.nodeType).toBe(1);
  });

  it("should disable the native <button> when rendering a <AccordionItem>", async () => {
    expect(accordionItem?.shadowRoot!.querySelector("button[disabled]")).not.toBeNull();
  });

  it("should not open", async () => {
    accordionItem?.click();
    await accordionItem?.updateComplete;
    expect(accordionItem?.open).toBe(false);
  });
});

describe("when properties has been settled", () => {
  document.body.innerHTML = `
  <h1>Custom element test</h1>
  <adc-accordion>
    <adc-accordion-item
      label-text="part 1"
    >
      Accordion
    </adc-accordion-item>
  </adc-accordion>`;
  const accordionItem = document.querySelector("adc-accordion-item");

  it("should has a adc-icon as first element with labelPosition = right", async () => {
    accordionItem!.labelPosition = "right" as any;
    await accordionItem?.updateComplete;
    const button = accordionItem?.shadowRoot!.querySelector("button");

    expect(button?.firstElementChild?.tagName.toLowerCase()).toBe("adc-icon");
  });

  it("should has a span as first element with labelPosition = left", async () => {
    accordionItem!.labelPosition = "left" as any;
    await accordionItem?.updateComplete;
    const button = accordionItem?.shadowRoot!.querySelector("button");

    expect(button?.firstElementChild?.tagName.toLowerCase()).toBe("span");
  });

  it("should open clicking the button element", async () => {
    accordionItem!.open = false;
    await accordionItem?.updateComplete;
    const button = accordionItem?.shadowRoot!.querySelector("button");
    button?.click();

    await accordionItem?.updateComplete;
    expect(accordionItem?.open).toBe(true);
  });

  it("should close clicking the button element", async () => {
    accordionItem!.open = true;
    await accordionItem?.updateComplete;
    const button = accordionItem?.shadowRoot!.querySelector("button");
    button?.click();

    await accordionItem?.updateComplete;
    expect(accordionItem?.open).toBe(false);
  });

  it("should close pressing esc key", async () => {
    accordionItem!.open = true;
    await accordionItem?.updateComplete;
    const button = accordionItem?.shadowRoot!.querySelector("button");
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      keyCode: 27,
      which: 27,
      code: "Escape"
    });
    button?.dispatchEvent(event);

    await accordionItem?.updateComplete;
    expect(accordionItem?.open).toBe(false);
  });
});
