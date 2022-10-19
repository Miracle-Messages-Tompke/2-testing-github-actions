import "@aileron/overflow";

describe("<adc-overflow>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-overflow>overflow</adc-overflow>`;
      const overflow = document.querySelector("adc-overflow");

      expect(overflow?.nodeType).toBe(1);
    });
  });
});
