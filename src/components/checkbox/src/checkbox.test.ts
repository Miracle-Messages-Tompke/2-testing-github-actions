import "@aileron/checkbox";
global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;
describe("<adc-checkbox>", () => {
  it("should be disabled with the disabled attribute", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-checkbox disabled>Checkbox Label</adc-checkbox>`;
    const checkbox = document.querySelector("adc-checkbox");

    await checkbox?.updateComplete;

    const element = checkbox?.shadowRoot!.querySelector("input")!;

    expect(element.disabled).not.toBeNull();
  });

  it("should be disabled when disabled property is set", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-checkbox disabled>Checkbox Label</adc-checkbox>`;
    const checkbox = document.querySelector("adc-checkbox");

    expect(checkbox?.disabled).toBe(true);
  });

  it("should be valid by default", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1><adc-checkbox>Checkbox Label</adc-checkbox>`;
    const checkbox = document.querySelector("adc-checkbox");

    expect(checkbox?.invalid).toBe(false);
  });

  describe("when submitting a form", () => {
    it("should show a constraint validation error when setCustomValidity() is called", async () => {
      document.body.innerHTML = `
      <h1>Custom element test</h1>
      <form>
        <adc-checkbox disabled>Checkbox Label</adc-checkbox>
        <button>Submit</button>
      </form>`;
      const checkbox = document.querySelector("adc-checkbox");
      await checkbox?.updateComplete;
      const setCustomValidityStub = jest.fn();
      checkbox!.input.setCustomValidity = setCustomValidityStub;

      checkbox?.setCustomValidity("Invalid selection");

      expect(setCustomValidityStub).toHaveBeenCalledWith("Invalid selection");
    });
  });

  describe("click", () => {
    it("should click the inner input", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-checkbox>Checkbox Label</adc-checkbox>`;
      const checkbox = document.querySelector("adc-checkbox");
      await checkbox?.updateComplete;
      const input = checkbox?.shadowRoot!.querySelector("input")!;
      const clickStub = jest.fn();

      input.addEventListener("click", clickStub, { once: true });

      checkbox?.click();
      await checkbox?.updateComplete;

      expect(clickStub).toHaveBeenCalled();
      expect(checkbox?.checked).toBe(true);
    });
  });

  describe("focus", () => {
    it("should focus the inner input", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-checkbox>Checkbox Label</adc-checkbox>`;
      const checkbox = document.querySelector("adc-checkbox");
      await checkbox?.updateComplete;
      const input = checkbox?.shadowRoot!.querySelector("input")!;
      const focusStub = jest.fn();

      input.addEventListener("focus", focusStub, { once: true });

      checkbox?.focus();
      await checkbox?.updateComplete;

      expect(focusStub).toHaveBeenCalled();
    });
  });

  describe("blur", () => {
    it("should blur the inner input", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-checkbox>Checkbox Label</adc-checkbox>`;
      const checkbox = document.querySelector("adc-checkbox");
      await checkbox?.updateComplete;
      const input = checkbox?.shadowRoot!.querySelector("input")!;
      const blurStub = jest.fn();

      input.addEventListener("blur", blurStub, { once: true });

      checkbox?.focus();
      await checkbox?.updateComplete;

      checkbox?.blur();
      await checkbox?.updateComplete;

      expect(blurStub).toHaveBeenCalled();
    });
  });
});
