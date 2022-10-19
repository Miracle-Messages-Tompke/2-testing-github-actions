import "@aileron/button-icon";

global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;
describe("<adc-button-icon>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon></adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");

      expect(buttonIcon?.nodeType).toBe(1);
    });

    it("should have correct default values", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon></adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");

      expect(buttonIcon?.autofocus).toBe(false);
      expect(buttonIcon?.disabled).toBe(false);
      expect(buttonIcon?.size).toBe("");
      expect(buttonIcon?.labelText).toBe("");
    });

    it("should render as a <button>", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon></adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");
      buttonIcon?.requestUpdate();
      await buttonIcon?.updateComplete;

      expect(buttonIcon?.shadowRoot!.querySelector("button")).not.toBeNull();
    });
  });

  describe("when disabled", () => {
    it("should be accessible", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon disabled></adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");
      await buttonIcon?.updateComplete;

      expect(buttonIcon?.nodeType).toBe(1);
    });

    it("should disable the native <button> when rendering a <ButtonIcon>", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon disabled></adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");

      await buttonIcon?.updateComplete;

      expect(buttonIcon?.shadowRoot!.querySelector("button[disabled]")).not.toBeNull();
    });

    it("should not bubble up clicks", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon disabled></adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");
      const handleClickStub = jest.fn();

      buttonIcon!.handleClick = handleClickStub;

      await buttonIcon?.updateComplete;

      buttonIcon?.click();
      expect(handleClickStub).not.toHaveBeenCalled();

      buttonIcon?.shadowRoot!.querySelector("button")!.click();
      await buttonIcon?.updateComplete;
      expect(handleClickStub).not.toHaveBeenCalled();
    });
  });

  describe("methods", () => {
    it("should emit adc-click event after clicking", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon></adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");
      await buttonIcon?.updateComplete;

      const dispatchEventStub = jest.fn();
      buttonIcon!.dispatchEvent = dispatchEventStub;
      buttonIcon?.buttonNode?.click();

      await buttonIcon?.updateComplete;

      expect(dispatchEventStub.mock.calls[0][0].type).toBe("adc-click");
    });

    it("should emit adc-focus event after focus", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon>Button</adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");
      await buttonIcon?.updateComplete;

      const dispatchEventStub = jest.fn();
      buttonIcon!.dispatchEvent = dispatchEventStub;
      buttonIcon?.buttonNode?.focus();

      await buttonIcon?.updateComplete;

      expect(dispatchEventStub.mock.calls[0][0].type).toBe("adc-focus");
    });

    it("should emit adc-blur event after blur", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon>Button</adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");
      await buttonIcon?.updateComplete;

      const dispatchEventStub = jest.fn();
      buttonIcon!.dispatchEvent = dispatchEventStub;
      buttonIcon?.buttonNode?.focus();
      buttonIcon?.buttonNode?.blur();

      await buttonIcon?.updateComplete;

      expect(dispatchEventStub.mock.calls[1][0].type).toBe("adc-blur");
    });
    it("should focus the inner button", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon>Button</adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");
      await buttonIcon?.updateComplete;
      const buttonElement = buttonIcon?.shadowRoot!.querySelector("button")!;
      const focusStub = jest.fn();

      buttonElement.addEventListener("focus", focusStub, { once: true });

      buttonIcon?.focus();
      await buttonIcon?.updateComplete;

      expect(focusStub).toHaveBeenCalled();
    });

    it("should blur the inner button", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-button-icon>Button</adc-button-icon>`;
      const buttonIcon = document.querySelector("adc-button-icon");
      await buttonIcon?.updateComplete;
      const buttonElement = buttonIcon?.shadowRoot!.querySelector("button")!;
      const blurStub = jest.fn();

      buttonElement.addEventListener("blur", blurStub, { once: true });

      buttonIcon?.focus();
      await buttonIcon?.updateComplete;

      buttonIcon?.blur();
      await buttonIcon?.updateComplete;

      expect(blurStub).toHaveBeenCalled();
    });
  });
});
