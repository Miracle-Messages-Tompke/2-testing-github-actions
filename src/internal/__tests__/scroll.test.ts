import * as scroll from "../scroll";

describe("internal", () => {
  describe("scroll", () => {
    it("should lock body scrolling", () => {
      const element = document.createElement("div");
      scroll.lockBodyScrolling(element);
      expect(document.body.classList.contains("adc-scroll-lock")).toBe(true);
    });
  });
});
