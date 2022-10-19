import "@aileron/text-input";

describe("<adc-text-input>", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;
  });
  it("should pass accessibility tests", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-text-input>Hello World</adc-text-input>`;
    const textInput = document.querySelector("adc-text-input");
    await expect(textInput?.nodeType).toBe(1);
  });

  it("should be disabled with the disabled attribute", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-text-input disabled>Hello World</adc-text-input>`;
    const textInput = document.querySelector("adc-text-input");
    await textInput?.updateComplete;
    const input = textInput?.shadowRoot!.querySelector<HTMLInputElement>('[part="input"]')!;

    expect(input.disabled).toBe(true);
  });

  describe("when using constraint validation", () => {
    it("should be valid by default", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-text-input>Hello World</adc-text-input>`;
      const textInput = document.querySelector("adc-text-input");
      await textInput?.updateComplete;
      expect(textInput?.invalid).toBe(false);
    });

    it("should be invalid when required and empty", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-text-input required>Hello World</adc-text-input>`;
      const textInput = document.querySelector("adc-text-input");
      await textInput?.updateComplete;
      expect(textInput?.reportValidity()).toBe(false);
      expect(textInput?.invalid).toBe(true);
    });

    it("should be invalid when the pattern does not match", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-text-input pattern="^test" value="1234">Hello World</adc-text-input>`;
      const textInput = document.querySelector("adc-text-input");

      await textInput?.updateComplete;
      expect(textInput?.reportValidity()).toBe(false);
      expect(textInput?.invalid).toBe(true);
    });
  });
});
