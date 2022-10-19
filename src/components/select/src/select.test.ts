import "@aileron/select";

global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn() })) as jest.Mock;

describe("<adc-select>", () => {
  it("should pass accessibility tests", () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-select>
        <adc-select-item value="option-1">option 1</adc-select-item>
        <adc-select-item value="option-2">option 1</adc-select-item>
        <adc-select-item value="option-3">option 1</adc-select-item>
      </adc-select>`;
    const select = document.querySelector("adc-select");

    expect(select?.nodeType).toBe(1);
  });

  it("should be disabled with the disabled attribute", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-select disabled>
        <adc-select-item value="option-1">option 1</adc-select-item>
        <adc-select-item value="option-2">option 1</adc-select-item>
        <adc-select-item value="option-3">option 1</adc-select-item>
      </adc-select>`;
    const select = document.querySelector("adc-select");
    await select?.updateComplete;

    expect(select?.dropdown.disabled).toBe(true);
  });

  it("should update the value when a menu item changes", async () => {
    document.body.innerHTML = `
      <h1>Custom element test</h1> 
      <adc-select value="option-1">
        <adc-select-item value="option-1">option 1</adc-select-item>
        <adc-select-item value="option-2">option 1</adc-select-item>
        <adc-select-item value="option-3">option 1</adc-select-item>
      </adc-select>`;
    const select = document.querySelector("adc-select");

    expect(select?.value).toBe("option-1");
    select!.value = "option-2";

    await select?.updateComplete;

    expect(select?.value).toBe("option-2");
  });
});
