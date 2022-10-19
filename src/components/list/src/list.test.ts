import "@aileron/list";

describe("<adc-list>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-list>list</adc-list>`;
      const list = document.querySelector("adc-list");

      expect(list?.nodeType).toBe(1);
    });
  });
});
