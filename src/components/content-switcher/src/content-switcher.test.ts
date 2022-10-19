import "@aileron/content-switcher";

describe("<adc-content-switch>", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;
  });
  it("should render default content switch", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-content-switch>Hello World</adc-content-switch>`;
    const contentSwitch = document.querySelector("adc-content-switch");
    await contentSwitch?.updateComplete;
    expect(contentSwitch?.selected).toBe(false);
    expect(contentSwitch?.getAttribute("aria-selected")).toBe("false");
    expect(contentSwitch?.getAttribute("tabindex")).toBe("-1");
    expect(contentSwitch?.disabled).toBe(false);
    expect(contentSwitch?.label).toBe("");
  });

  it("should disable the switch by attribute", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-content-switch disabled>Hello World</adc-content-switch>`;
    const contentSwitch = document.querySelector("adc-content-switch");
    await contentSwitch?.updateComplete;
    expect(contentSwitch?.disabled).toBe(true);
  });

  it("should select the switch by attribute", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-content-switch selected>Hello World</adc-content-switch>`;
    const contentSwitch = document.querySelector("adc-content-switch");
    await contentSwitch?.updateComplete;
    expect(contentSwitch?.selected).toBe(true);
  });

  it("should render a label", async () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <adc-content-switch label="foo">Hello World</adc-content-switch>`;
    const contentSwitch = document.querySelector("adc-content-switch");
    await contentSwitch?.updateComplete;

    expect(contentSwitch?.label).toBe("foo");
  });
});
