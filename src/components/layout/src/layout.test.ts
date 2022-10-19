import "@aileron/layout";

describe("<adc-layout>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-layout>layout</adc-layout>`;
      const layout = document.querySelector("adc-layout");

      expect(layout?.nodeType).toBe(1);
    });
  });
});
