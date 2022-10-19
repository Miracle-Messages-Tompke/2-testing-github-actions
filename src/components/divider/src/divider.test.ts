import "@aileron/icon";
import "@aileron/divider";

global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;
describe("<adc-divider>", () => {
  document.body.innerHTML = `<h1>Custom element test</h1> <adc-divider>Hello World</adc-divider>`;
  const divider = document.querySelector("adc-divider");

  describe("when no properties are written", () => {
    it("should be accessible", async () => {
      expect(divider?.nodeType).toBe(1);
    });
    it("should contain the class adc-divider", () => {
      const element = divider?.shadowRoot?.querySelector(".adc-divider");
      expect(element).not.toBeNull();
    });
  });
});
