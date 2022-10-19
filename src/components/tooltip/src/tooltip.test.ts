import "@aileron/tooltip";
global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;
describe("<adc-tooltip>", () => {
  describe("should be accessible", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-tooltip>Hello World</adc-tooltip>`;
      const tooltip = document.querySelector("adc-tooltip");

      expect(tooltip?.nodeType).toBe(1);
    });
  });
});
