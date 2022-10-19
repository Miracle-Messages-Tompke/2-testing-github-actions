import "@aileron/number-input";

global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;

describe("<adc-number-input>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-number-input>number-input</adc-number-input>`;
      const numberInput = document.querySelector("adc-number-input");

      expect(numberInput?.nodeType).toBe(1);
    });
  });
});
