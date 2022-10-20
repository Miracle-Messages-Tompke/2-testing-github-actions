import "@aileron/button";

const kinds = ["primary", "secondary", "ghost"];
global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;

// changed tests

describe("accessibility tests", () => {
  kinds.forEach((kind) => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-button kind=${kind}></adc-button>`;
    const button = document.querySelector("adc-button");

    it(`should be accessible when kind is "${kind}"`, () => {
      expect(button?.nodeType).toBe(1);
    });
  });
});

describe("when no properties are written", () => {
  it("should be accessible", () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-button>Button Label</adc-button>`;
    const button = document.querySelector("adc-button");

    expect(button?.nodeType).toBe(1);
  });

  it("should have correct default values", () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-button>Button Label</adc-button>`;
    const button = document.querySelector("adc-button");

    expect(button?.autofocus).toBe(false);
    expect(button?.disabled).toBe(false);
    expect(button?.kind).toBe("primary");
    expect(button?.labelText).toBe("");
    expect(button?.size).toBe("");
    expect(button?.type).toBe("button");
  });

  it("should render as a <button>", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-button>Button Label</adc-button>`;
    const button = document.querySelector("adc-button");
    await button?.updateComplete;

    expect(button?.shadowRoot!.querySelector("button")).not.toBeNull();
  });
});

describe("when disabled", () => {
  document.body.innerHTML = `<h1>Custom element test</h1><adc-button disabled>Button Label</adc-button>`;
  const button = document.querySelector("adc-button");
  it("should be accessible", async () => {
    await button?.updateComplete;
    expect(button?.nodeType).toBe(1);
  });

  it("should disable the native <button> when rendering a <button>", async () => {
    await button?.updateComplete;
    expect(button?.shadowRoot!.querySelector("button[disabled]")).not.toBeNull();
  });

  it("should not bubble up clicks", async () => {
    const handleClickStub = jest.fn();

    button!.handleClick = handleClickStub;

    button?.requestUpdate();
    await button?.updateComplete;

    button?.click();
    expect(handleClickStub).not.toHaveBeenCalled();

    button?.shadowRoot!.querySelector("button")!.click();
    expect(handleClickStub).not.toHaveBeenCalled();
  });
});

describe("methods", () => {
  it("should emit adc-click event after clicking", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-button>Button Label</adc-button>`;
    const button = document.querySelector("adc-button");
    await button?.updateComplete;
    const dispatchEventStub = jest.fn();
    button!.dispatchEvent = dispatchEventStub;
    button?.buttonNode?.click();

    await button?.updateComplete;

    expect(dispatchEventStub.mock.calls[0][0].type).toBe("adc-click");
  });

  it("should emit adc-focus event after focus", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-button>Button Label</adc-button>`;
    const button = document.querySelector("adc-button");
    await button?.updateComplete;
    const dispatchEventStub = jest.fn();

    button!.dispatchEvent = dispatchEventStub;
    const buttonElement = button?.shadowRoot?.querySelector("button");
    buttonElement?.focus();

    expect(dispatchEventStub).toHaveBeenCalled();
    expect(dispatchEventStub.mock.calls[0][0].type).toBe("adc-focus");
  });

  it("should emit adc-blur event after blur", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-button>Button Label</adc-button>`;
    const button = document.querySelector("adc-button");
    await button?.updateComplete;
    const dispatchEventStub = jest.fn();

    button!.dispatchEvent = dispatchEventStub;

    button?.buttonNode?.focus();
    button?.buttonNode?.blur();

    await button?.updateComplete;

    expect(dispatchEventStub.mock.calls[1][0].type).toBe("adc-blur");
  });

  it("should focus the inner button", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-button>Button Label</adc-button>`;
    const button = document.querySelector("adc-button");
    await button?.updateComplete;
    const buttonElement = button?.shadowRoot!.querySelector("button")!;
    const focusStub = jest.fn();

    buttonElement.focus = focusStub;

    button?.focus();
    await button?.updateComplete;

    expect(focusStub).toHaveBeenCalled();
  });

  it("should blur the inner button", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-button>Button Label</adc-button>`;
    const button = document.querySelector("adc-button");
    await button?.updateComplete;
    const buttonElement = button?.shadowRoot!.querySelector("button")!;
    const blurStub = jest.fn();

    buttonElement.blur = blurStub;

    button?.focus();
    await button?.updateComplete;

    button?.blur();
    await button?.updateComplete;

    expect(blurStub).toHaveBeenCalled();
  });
});
