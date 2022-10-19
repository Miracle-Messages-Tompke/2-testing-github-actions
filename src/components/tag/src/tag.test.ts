import "@aileron/tag";

const kinds = ["information", "success", "warning", "error"];
global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;
describe("<adc-tag>", () => {
  describe("when tag kind is set.", () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-tag>Hello World</adc-tag>`;
    const tag = document.querySelector("adc-tag");
    kinds.forEach((kind) => {
      it(`should contain the property kind: ${kind}`, () => {
        tag!.kind = kind as any;

        expect(tag?.kind).toBe(kind);
      });

      it(`should be accessible when the class is ${kind}`, () => {
        expect(tag?.nodeType).toBe(1);
      });
    });
  });

  describe("when tag has no properties set", () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-tag>Hello World</adc-tag>`;
    const tag = document.querySelector("adc-tag");
    it("should have default properties states", () => {
      expect(tag?.kind).toBe("");
      expect(tag?.position).toBe("ltr");
      expect(tag?.variant).toBe("");
    });

    it(`should be accessible`, () => {
      expect(tag?.nodeType).toBe(1);
    });
  });

  describe("when tag has label-text set", () => {
    it("should contain the property labelText", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-tag>Hello World</adc-tag>`;
      const tag = document.querySelector("adc-tag");
      await tag?.updateComplete;
      tag?.setAttribute("label-text", "Hello World");

      expect(tag?.labelText).toBe("Hello World");
    });
  });

  describe("when tag has position set", () => {
    it("should contain the property position='rtl'", () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-tag position="rtl">Hello World</adc-tag>`;
      const tag = document.querySelector("adc-tag");

      expect(tag?.position).toBe("rtl");
    });

    it("should contain the property position='ltr'", () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-tag position="ltr">Hello World</adc-tag>`;
      const tag = document.querySelector("adc-tag");
      expect(tag?.position).toBe("ltr");
    });
  });

  describe("when tag has variant set", () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-tag position="rtl">Hello World</adc-tag>`;
    const tag = document.querySelector("adc-tag");
    kinds.forEach((kind) => {
      it(`should contain the property variant='ribbon' with kind="${kind}"`, () => {
        tag!.variant = "ribbon" as any;
        tag!.kind = kind as any;

        expect(tag?.variant).toBe("ribbon");
      });
    });
  });
});
