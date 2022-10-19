import "@aileron/tabs";

describe("<adc-tabs>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-tabs>tabs</adc-tabs>`;
      const tabs = document.querySelector("adc-tabs");

      expect(tabs?.nodeType).toBe(1);
    });
  });
});
