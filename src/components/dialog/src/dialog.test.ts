import "@aileron/dialog";

describe("<adc-dialog>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-dialog>dialog</adc-dialog>`;
      const dialog = document.querySelector("adc-dialog");

      expect(dialog?.nodeType).toBe(1);
    });
  });
});
