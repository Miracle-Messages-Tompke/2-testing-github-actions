import "@aileron/link";

describe("<adc-link>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-link>link</adc-link>`;
      const link = document.querySelector("adc-link");

      expect(link?.nodeType).toBe(1);
    });
  });
});
