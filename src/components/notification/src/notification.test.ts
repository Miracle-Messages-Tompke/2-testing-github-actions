import "@aileron/notification";

global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;

const kinds = [
  { kind: "information", icon: "information" },
  { kind: "success", icon: "checkmark" },
  { kind: "warning", icon: "warning" },
  { kind: "error", icon: "error" }
];

describe("<adc-notification>", () => {
  describe("when notification kind is set", () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-notification>Hello World</adc-notification>`;
    const notification = document.querySelector("adc-notification");
    kinds.forEach((kind) => {
      it("should have the correct icon", async () => {
        notification!.kind = kind.kind as any;
        await notification?.updateComplete;
        const icon = notification?.shadowRoot!.querySelector("adc-icon")!;
        expect(icon.icon).toBe(`signal:${kind.icon}`);
      });

      it(`should contain the property kind: ${kind.kind}`, () => {
        notification!.kind = kind.kind as any;

        expect(notification?.kind).toBe(kind.kind);
      });
    });
  });

  describe("when no properties are written", () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-notification>Hello World</adc-notification>`;
    const notification = document.querySelector("adc-notification");
    it("should have default values", async () => {
      await notification?.updateComplete;

      expect(notification?.kind).toBe("information");
      expect(notification?.title).toBe(undefined);
      // Inline is not currently used
      // expect(el.inline).to.be.false;
      expect(notification?.fullwidth).toBe(false);
      expect(notification?.canClose).toBe(false);
      expect(notification?.closeLabel).toBe("Dismiss");
    });

    it("should be accessible", () => {
      expect(notification?.nodeType).toBe(1);
    });

    it("should contain the class adc-?__content-wrapper", async () => {
      await notification?.updateComplete;
      const element = notification?.shadowRoot!.querySelector(".adc-notification__content-wrapper");

      expect(element).not.toBeNull();
    });
  });
});
