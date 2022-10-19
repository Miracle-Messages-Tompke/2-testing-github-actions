import "@aileron/loading";

global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;

describe("<adc-loading>", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;
  });

  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-loading>loading</adc-loading>`;
      const loading = document.querySelector("adc-loading");

      expect(loading?.nodeType).toBe(1);
    });
  });
});
