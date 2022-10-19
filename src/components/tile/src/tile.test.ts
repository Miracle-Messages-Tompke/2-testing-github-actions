import "@aileron/tile";

describe("<adc-tile>", () => {
  it("should exist", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-tile>Hello World</adc-tile>`;
    const textInput = document.querySelector("adc-tile");

    await expect(textInput?.nodeType).toBe(1);
  });
});
