import "@aileron/icon";
global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;
describe("<adc-icon>", () => {
  it(`should be accessible`, () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-icon icon="signal:information">Hello World</adc-icon>`;
    const icon = document.querySelector("adc-icon");

    expect(icon?.nodeType).toBe(1);
  });
});
