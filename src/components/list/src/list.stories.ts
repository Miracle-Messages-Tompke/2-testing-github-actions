import "@aileron/list";
import { html } from "lit-html";

export const Ordered = () => {
  return html`
    <adc-ordered-list>
      <adc-list-item>Item 1</adc-list-item>
      <adc-list-item>Item 2</adc-list-item>
      <adc-list-item>
        Item 3
        <adc-ordered-list>
          <adc-list-item>First nested item</adc-list-item>
          <adc-list-item>Second nested item</adc-list-item>
          <adc-list-item>Third nested item</adc-list-item>
          <adc-list-item>Fourth nested item</adc-list-item>
          <adc-list-item>Fifth nested item</adc-list-item>
        </adc-ordered-list>
      </adc-list-item>
      <adc-list-item>Item 4</adc-list-item>
      <adc-list-item>Item 5</adc-list-item>
    </adc-ordered-list>
  `;
};

Ordered.storyName = "Ordered";
Ordered.parameters = {
  jest: "list.test.ts"
};

export const Unordered = () => {
  return html`
    <adc-unordered-list>
      <adc-list-item>Item 1</adc-list-item>
      <adc-list-item>Item 2</adc-list-item>
      <adc-list-item>
        Item 3
        <adc-unordered-list>
          <adc-list-item>First nested item</adc-list-item>
          <adc-list-item>Second nested item</adc-list-item>
          <adc-list-item>Third nested item</adc-list-item>
          <adc-list-item>Fourth nested item</adc-list-item>
          <adc-list-item>Fifth nested item</adc-list-item>
        </adc-unordered-list>
      </adc-list-item>
      <adc-list-item>Item 4</adc-list-item>
      <adc-list-item>Item 5</adc-list-item>
    </adc-unordered-list>
  `;
};

Unordered.storyName = "Unordered";
Unordered.parameters = {
  jest: "list.test.ts"
};

export const Bulletless = () => {
  return html`
    <adc-unordered-list>
      <adc-list-item kind="default">Item 1</adc-list-item>
      <adc-list-item kind="default">Item 2</adc-list-item>
      <adc-list-item kind="default">Item 3</adc-list-item>
      <adc-list-item kind="default">Item 4</adc-list-item>
      <adc-list-item kind="default">Item 5</adc-list-item>
    </adc-unordered-list>
  `;
};

Bulletless.storyName = "Bulletless";
Bulletless.parameters = {
  jest: "list.test.ts"
};

export const ProList = () => {
  return html`
    <adc-unordered-list>
      <adc-list-item kind="success">Item 1</adc-list-item>
      <adc-list-item kind="success">Item 2</adc-list-item>
      <adc-list-item kind="success">Item 3</adc-list-item>
      <adc-list-item kind="success">Item 4</adc-list-item>
      <adc-list-item kind="success">Item 5</adc-list-item>
    </adc-unordered-list>
  `;
};

ProList.storyName = "Pros List";
ProList.parameters = {
  jest: "list.test.ts"
};

export const ConList = () => {
  return html`
    <adc-unordered-list>
      <adc-list-item kind="error">Item 1</adc-list-item>
      <adc-list-item kind="error">Item 2</adc-list-item>
      <adc-list-item kind="error">Item 3</adc-list-item>
      <adc-list-item kind="error">Item 4</adc-list-item>
      <adc-list-item kind="error">Item 5</adc-list-item>
    </adc-unordered-list>
  `;
};

ConList.storyName = "Cons List";
ConList.parameters = {
  jest: "list.test.ts"
};

export const ProConList = () => {
  return html`
    <adc-unordered-list>
      <adc-list-item>
        Item 1
        <adc-unordered-list>
          <adc-list-item kind="error">Nested con</adc-list-item>
          <adc-list-item kind="error">Nested con</adc-list-item>
          <adc-list-item kind="success">Nested pro</adc-list-item>
        </adc-unordered-list>
      </adc-list-item>
      <adc-list-item>
        Item 2
        <adc-unordered-list>
          <adc-list-item kind="success">Nested pro</adc-list-item>
        </adc-unordered-list>
      </adc-list-item>
      <adc-list-item>
        Item 3
        <adc-unordered-list>
          <adc-list-item kind="error">Nested con</adc-list-item>
          <adc-list-item kind="success">Nested pro</adc-list-item>
        </adc-unordered-list>
      </adc-list-item>
    </adc-unordered-list>
  `;
};

ProConList.storyName = "Pros/Cons List";
ProConList.parameters = {
  jest: "list.test.ts"
};

export default {
  title: "Components/List",
  component: "adc-list-item",
  subcomponents: ["adc-unordered-list", "adc-ordered-list"],
  decorators: [(story) => html`${story()}`]
};
