import "@aileron/action-drawer";
import "@aileron/button";

global.fetch = jest.fn(() =>
  Promise.resolve({ text: jest.fn() }).catch(() => jest.fn())
) as jest.Mock;
describe("accessibility tests", () => {
  it("should be accessible", () => {
    document.body.innerHTML = `
    <h1>Custom element test</h1>
    <adc-action-drawer>
    actionDrawer
    </adc-action-drawer>`;
    const actionDrawer = document.querySelector("adc-action-drawer");

    expect(actionDrawer?.nodeType).toBe(1);
  });
});

describe("when no properties are written", () => {
  document.body.innerHTML = `
  <h1>Custom element test</h1>
  <adc-action-drawer>
    actionDrawer
  </adc-action-drawer>`;

  it("should have correct default values", () => {
    const actionDrawer = document.querySelector("adc-action-drawer");

    expect(actionDrawer?.open).toBe(false);
    expect(actionDrawer?.transactional).toBe(false);
    expect(actionDrawer?.drawerPosition).toBe("left");
  });

  it("should contain the class adc-action-drawer__container", async () => {
    const actionDrawer = document.querySelector("adc-action-drawer");
    const element = actionDrawer?.shadowRoot!.querySelector(".adc-action-drawer__container");

    expect(element).not.toBeNull();
  });
});

describe("when properties has been settled", () => {
  document.body.innerHTML = `
  <h1>Custom element test</h1>
  <adc-button>Open Action Drawer</adc-button>
  <adc-action-drawer
    id="actiondrawer"
    transactional
  >
    <adc-action-drawer-header>
      <adc-action-drawer-close-button></adc-action-drawer-close-button>
      <adc-action-drawer-heading>Heading</adc-action-drawer-heading>
    </adc-action-drawer-header>
    <adc-action-drawer-body>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum.
      </p>
    </adc-action-drawer-body>
    <adc-action-drawer-footer>
      <adc-button
        kind="secondary"
        position="left"
        size="fullwidth"
        style="margin-right: 16px; margin-top: 16px;"
        >Button</adc-button
      >
      <adc-button
        kind="primary"
        position="right"
        size="fullwidth"
        style="margin-top: 16px;"
        data-action-drawer-close
        >Button</adc-button
      >
    </adc-action-drawer-footer>
  </adc-action-drawer>`;

  it("should contain the class adc-action-drawer__container--right with drawerPosition = right", async () => {
    const actionDrawer = document.querySelector("adc-action-drawer");
    actionDrawer!.drawerPosition = "right" as any;

    await actionDrawer?.updateComplete;
    const element = actionDrawer?.shadowRoot!.querySelector(".adc-action-drawer__container--right");

    expect(element).not.toBeNull();
  });

  it("Should close clicking action-drawer-close-button", async () => {
    const actionDrawer = document.querySelector("adc-action-drawer");
    //const actionDrawerCloseButton = document.querySelector("adc-action-drawer-close-button");
    actionDrawer!.open = true;
    actionDrawer?.requestUpdate();
    await actionDrawer?.updateComplete;

    actionDrawer?.click();

    await actionDrawer?.updateComplete;

    expect(actionDrawer?.open).toBe(false);
  });

  it("Should close clicking Footer Primary Close Button", async () => {
    const actionDrawer = document.querySelector("adc-action-drawer");

    actionDrawer!.open = true;
    actionDrawer?.requestUpdate();
    await actionDrawer?.updateComplete;

    actionDrawer?.click();

    await actionDrawer?.updateComplete;

    expect(actionDrawer?.open).toBe(false);
  });

  it("Shouldn't close clicking Footer Secondary Close Button", async () => {
    const actionDrawer = document.querySelector("adc-action-drawer");
    const buttonSecondary = actionDrawer?.shadowRoot?.querySelector("adc-button[kind=secondary]");
    actionDrawer!.open = true;
    actionDrawer?.requestUpdate();
    await actionDrawer?.updateComplete;
    const closeButton = buttonSecondary?.shadowRoot!.querySelector("button");

    closeButton?.click();

    await actionDrawer?.updateComplete;

    expect(actionDrawer?.open).toBe(true);
  });
});
