import "@aileron/card";

describe("<adc-card>", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ text: jest.fn() })
    })
  ) as jest.Mock;
  describe("when no properties are written", () => {
    it("should be accessible", () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-card>Hello World</adc-card>`;
      const card = document.querySelector("adc-card");

      expect(card?.nodeType).toBe(1);
    });

    it("should render the child content", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-card>Hello World</adc-card>`;
      const card = document.querySelector("adc-card");

      await card?.updateComplete;
      expect(card?.textContent).toBe("Hello World");
    });

    it("should contain the class adc-card", async () => {
      document.body.innerHTML = `<h1>Custom element test</h1> <adc-card>Hello World</adc-card>`;
      const card = document.querySelector("adc-card");
      await card?.updateComplete;
      const element = card?.shadowRoot!.querySelector(".adc-card");

      expect(element).not.toBeNull();
    });
  });

  describe('when provided an element in the slot "media" to render an adc-card-media', () => {
    document.body.innerHTML = `
    <h1>Custom element test</h1> 
    <adc-card>
      <adc-card-media slot="media" src="https://picsum.photos/200/300">This is now a media card!</adc-card-media>
    </adc-card>`;
    const card = document.querySelector("adc-card");
    const cardMedia = document.querySelector("adc-card-media");

    it("should pass accessibility tests", async () => {
      await expect(card?.nodeType).toBe(1);
    });

    it("should render the child content", async () => {
      expect(cardMedia?.textContent).toBe("This is now a media card!");
    });

    it("should render the media content", () => {
      const media = card?.querySelector("adc-card-media[slot=media]");

      expect(media).not.toBeNull();
    });

    it('should accept "media" as an assigned child in the shadow root', () => {
      const slot = card?.shadowRoot!.querySelector("slot[name=media]")! as any;
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).toBe(1);
    });

    it("should contain the class adc-card__media", () => {
      const mediaCard = card?.querySelector<HTMLElement>("adc-card-media")!;
      const media = mediaCard.shadowRoot!.querySelector(".adc-card__media");

      expect(media).not.toBeNull();
    });
  });
});
