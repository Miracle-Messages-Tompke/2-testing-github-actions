import "@aileron/modal";

describe("<adc-modal>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-modal>modal</adc-modal>`;
      const modal = document.querySelector("adc-modal");

      expect(modal?.nodeType).toBe(1);
    });
  });
});
