import "@aileron/data-table";

describe("<adc-table>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-table>table</adc-table>`;
      const table = document.querySelector("adc-table");

      expect(table?.nodeType).toBe(1);
    });
  });
});
