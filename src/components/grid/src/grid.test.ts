import "@aileron/grid";

describe("<adc-grid>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-grid>grid</adc-grid>`;
      const grid = document.querySelector("adc-grid");

      expect(grid?.nodeType).toBe(1);
    });
  });
});
