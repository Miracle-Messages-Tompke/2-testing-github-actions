import "@aileron/carousel";

describe("<adc-carousel>", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;
  });

  beforeEach(() => {
    window.ResizeObserver =
      window.ResizeObserver ||
      jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn()
      }));
  })
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1><adc-carousel>Carousel</adc-carousel>`;
      const carousel = document.querySelector("adc-carousel");

      expect(carousel?.nodeType).toBe(1);
    });
  });
});
