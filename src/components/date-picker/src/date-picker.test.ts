import "@aileron/date-picker";

describe("<adc-date-picker>", () => {
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-date-picker>date-picker</adc-date-picker>`;
      const datePicker = document.querySelector("adc-date-picker");

      expect(datePicker?.nodeType).toBe(1);
    });
  });
});
