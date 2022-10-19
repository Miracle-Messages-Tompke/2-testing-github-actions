import "@aileron/radio-button";

global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;

describe("<adc-radio-button>", () => {
  it("should be disabled with the disabled attribute", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-radio-button disabled>
        radio button
      </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;

    expect(radioButton?.input.disabled).toBe(true);
  });

  it("should be valid by default", () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-radio-button>
        radio button
      </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    expect(radioButton?.invalid).toBe(false);
  });

  it("should fire adc-change when clicked", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-radio-button>
        radio button
      </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;
    const input = radioButton?.shadowRoot?.getElementById("input") as any;
    input.click();

    expect(radioButton?.checked).toBe(true);
  });

  it("should not get checked when disabled", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-radio-button disabled>
        radio button
      </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;
    radioButton?.click();

    expect(radioButton?.checked).toBe(false);
  });

  it("should emit adc-focus event after focus", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-radio-button>
        radio button
      </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;

    const dispatchEventStub = jest.fn();
    radioButton!.dispatchEvent = dispatchEventStub;

    const input = radioButton?.shadowRoot?.querySelector("input");

    input?.focus();

    await radioButton?.updateComplete;

    expect(dispatchEventStub.mock.calls[0][0].type).toBe("adc-focus");
  });

  it("should emit adc-blur event after blur", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-radio-button>
        radio button
      </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;

    const dispatchEventStub = jest.fn();
    radioButton!.dispatchEvent = dispatchEventStub;

    const input = radioButton?.shadowRoot?.querySelector("input");

    input?.focus();
    input?.blur();

    await radioButton?.updateComplete;

    expect(dispatchEventStub.mock.calls[1][0].type).toBe("adc-blur");
  });

  it("should invalid be true after calling handleInvalid", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-radio-button>
        radio button
      </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;

    radioButton?.handleInvalid();

    await radioButton?.updateComplete;

    expect(radioButton?.invalid).toBe(true);
  });

  it("should focus the inner input", async () => {
    document.body.innerHTML = `
    <h1>Custom element test</h1> 
    <adc-radio-button>
      radio button
    </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;
    const input = radioButton?.shadowRoot!.querySelector("input")!;
    const focusStub = jest.fn();

    input.addEventListener("focus", focusStub, { once: true });

    radioButton?.focus();
    await radioButton?.updateComplete;

    expect(focusStub).toHaveBeenCalled();
  });

  it("should blur the inner input", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-radio-button>
        radio button
      </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;
    const input = radioButton?.shadowRoot!.querySelector("input")!;
    const blurStub = jest.fn();

    input.addEventListener("blur", blurStub, { once: true });

    radioButton?.focus();
    await radioButton?.updateComplete;

    radioButton?.blur();
    await radioButton?.updateComplete;

    expect(blurStub).toHaveBeenCalled();
  });

  it("should has aria-disabled=true when disabled is true", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-radio-button>
        radio button
      </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;
    radioButton!.disabled = true;
    await radioButton?.updateComplete;
    expect(radioButton?.getAttribute("aria-disabled")).toBe("true");
  });

  it("should has aria-disabled=false when disabled is false", async () => {
    document.body.innerHTML = `
    <h1>Custom element test</h1> 
    <adc-radio-button disabled>
      radio button
    </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;
    radioButton!.disabled = false;
    await radioButton?.updateComplete;
    expect(radioButton?.getAttribute("aria-disabled")).toBe("false");
  });

  it("should call reportValidity", async () => {
    document.body.innerHTML = `
    <h1>Custom element test</h1> 
    <adc-radio-button>
      radio button
    </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;
    const input = radioButton?.shadowRoot!.querySelector("input")!;
    const reportValidityStub = jest.fn();

    input.reportValidity = reportValidityStub;

    radioButton?.reportValidity();
    await radioButton?.updateComplete;

    expect(reportValidityStub).toHaveBeenCalled();
  });

  it("should call checkValidity", async () => {
    document.body.innerHTML = `
    <h1>Custom element test</h1> 
    <adc-radio-button>
      radio button
    </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;
    const input = radioButton?.shadowRoot!.querySelector("input")!;
    const checkValidityStub = jest.fn();

    input.checkValidity = checkValidityStub;

    radioButton?.checkValidity();
    await radioButton?.updateComplete;

    expect(checkValidityStub).toHaveBeenCalled();
  });

  it("should call setCustomValidity", async () => {
    document.body.innerHTML = `
    <h1>Custom element test</h1> 
    <adc-radio-button>
      radio button
    </adc-radio-button>`;
    const radioButton = document.querySelector("adc-radio-button");
    await radioButton?.updateComplete;
    const input = radioButton?.shadowRoot!.querySelector("input")!;
    const setCustomValidityStub = jest.fn();

    input.setCustomValidity = setCustomValidityStub;

    radioButton?.setCustomValidity("invalid");
    await radioButton?.updateComplete;

    expect(setCustomValidityStub).toHaveBeenCalledWith("invalid");
  });
});
