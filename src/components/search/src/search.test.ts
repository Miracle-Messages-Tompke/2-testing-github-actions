import "@aileron/search";

global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;

describe("<adc-search>", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;
  });

  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-search>search</adc-search>`;
      const search = document.querySelector("adc-search");

      expect(search?.nodeType).toBe(1);
    });
  });
});
