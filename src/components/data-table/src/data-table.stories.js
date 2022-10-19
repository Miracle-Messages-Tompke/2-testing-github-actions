import "@aileron/data-table";
import { expect } from "@storybook/jest";
import { userEvent } from "@storybook/testing-library";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export default {
  title: "Components/Data table",
  component: "adc-table",
  args: {
    size: "regular",
    "icon-position": "left",
    divider: false
  },
  argTypes: {
    size: {
      name: "size",
      type: { name: "text" },
      options: ["short", "tall", "default"],
      control: {
        type: "select"
      },
      table: {
        defaultValue: {
          summary: "regular"
        }
      },
      mapping: { regular: "" }
    },
    "icon-position": {
      type: {
        name: "text",
        required: false
      },
      options: ["left", "right"],
      table: {
        type: { summary: ['"left"', '"right"'] },
        defaultValue: { summary: "left" }
      },
      control: {
        type: "select"
      }
    },
    divider: {
      name: "divider",
      type: {
        name: "boolean",
        required: false
      },
      description: "Display dividers on table header/cells.",
      table: {
        type: {
          summary: "boolean"
        },
        defaultValue: { summary: false }
      },
      control: { type: "boolean" }
    }
  }
};

export const DefaultTable = (args) => {
  return html`
    <adc-table size="${args?.size}">
      <adc-table-head>
        <adc-table-header-row ?divider="${args?.divider}">
          <adc-table-header-cell>Heading</adc-table-header-cell>
          <adc-table-header-cell>Heading</adc-table-header-cell>
          <adc-table-header-cell>Heading</adc-table-header-cell>
          <adc-table-header-cell>Heading</adc-table-header-cell>
        </adc-table-header-row>
      </adc-table-head>
      <adc-table-body>
        <adc-table-row ?divider="${args?.divider}">
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
        </adc-table-row>
        <adc-table-row ?divider="${args?.divider}">
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
        </adc-table-row>
        <adc-table-row ?divider="${args?.divider}">
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
        </adc-table-row>
      </adc-table-body>
    </adc-table>
  `;
};

DefaultTable.storyName = "Default";

DefaultTable.parameters = {
  jest: "table.test.ts"
};

const ExpandableTemplate = (
  { size, divider, "icon-position": iconPosition } = {
    size: "",
    divider: false,
    "icon-position": "left"
  }
) => {
  const handleExpandRowAll = (event) => {
    const { currentTarget, detail } = event;
    const rows = currentTarget.querySelectorAll("adc-table-expand-row");
    Array.prototype.forEach.call(rows, (row) => {
      row.expanded = detail.expanded;
    });
  };
  const handleExpandRow = (event) => {
    const { currentTarget } = event;
    const headerRow = currentTarget.querySelector("adc-table-header-expand-row");
    const rows = currentTarget.querySelectorAll("adc-table-expand-row");
    headerRow.expanded = Array.prototype.every.call(rows, (row) => row.expanded);
  };
  return html`
    <adc-table
      size="${ifDefined(size)}"
      @adc-table-row-expando-toggled-all="${handleExpandRowAll}"
      @adc-table-row-expando-toggled="${handleExpandRow}"
    >
      <adc-table-head>
        <adc-table-header-expand-row
          icon-position="${ifDefined(iconPosition)}"
          ?divider="${divider}"
        >
          <adc-table-header-cell>Heading</adc-table-header-cell>
          <adc-table-header-cell>Heading</adc-table-header-cell>
          <adc-table-header-cell>Heading</adc-table-header-cell>
          <adc-table-header-cell>Heading</adc-table-header-cell>
          <adc-table-header-cell>Heading</adc-table-header-cell>
          <adc-table-header-cell>Heading</adc-table-header-cell>
        </adc-table-header-expand-row>
      </adc-table-head>
      <adc-table-body>
        <adc-table-expand-row
          icon-position="${ifDefined(iconPosition)}"
          ?divider="${divider}"
          data-row-id="1"
        >
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
        </adc-table-expand-row>
        <adc-table-expanded-row colspan="7">
          <p>
            onsequat amet fugiat in officia sit cillum cupidatat fugiat incididunt reprehenderit
            minim deserunt voluptate mollit. Incididunt non aute pariatur laboris laborum est.
            Cillum adipisicing duis in deserunt anim sit id occaecat in et nisi. Magna sit nostrud
            officia ipsum reprehenderit consequat nulla officia eu ut incididunt. Qui non laboris
            esse sit consectetur nostrud velit labore eu ipsum nisi quis id eu. Fugiat do aute
            tempor labore et laborum deserunt aliquip. Nisi elit id exercitation veniam ex eu
            proident voluptate ipsum.
          </p>
        </adc-table-expanded-row>
        <adc-table-expand-row
          icon-position="${ifDefined(iconPosition)}"
          ?divider="${divider}"
          data-row-id="2"
        >
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
        </adc-table-expand-row>
        <adc-table-expanded-row colspan="7">
          <p>
            onsequat amet fugiat in officia sit cillum cupidatat fugiat incididunt reprehenderit
            minim deserunt voluptate mollit. Incididunt non aute pariatur laboris laborum est.
            Cillum adipisicing duis in deserunt anim sit id occaecat in et nisi. Magna sit nostrud
            officia ipsum reprehenderit consequat nulla officia eu ut incididunt. Qui non laboris
            esse sit consectetur nostrud velit labore eu ipsum nisi quis id eu. Fugiat do aute
            tempor labore et laborum deserunt aliquip. Nisi elit id exercitation veniam ex eu
            proident voluptate ipsum.
          </p>
        </adc-table-expanded-row>
        <adc-table-expand-row
          icon-position="${ifDefined(iconPosition)}"
          ?divider="${divider}"
          data-row-id="3"
        >
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
          <adc-table-cell>Cell Text</adc-table-cell>
        </adc-table-expand-row>
        <adc-table-expanded-row colspan="7">
          <p>
            onsequat amet fugiat in officia sit cillum cupidatat fugiat incididunt reprehenderit
            minim deserunt voluptate mollit. Incididunt non aute pariatur laboris laborum est.
            Cillum adipisicing duis in deserunt anim sit id occaecat in et nisi. Magna sit nostrud
            officia ipsum reprehenderit consequat nulla officia eu ut incididunt. Qui non laboris
            esse sit consectetur nostrud velit labore eu ipsum nisi quis id eu. Fugiat do aute
            tempor labore et laborum deserunt aliquip. Nisi elit id exercitation veniam ex eu
            proident voluptate ipsum.
          </p>
        </adc-table-expanded-row>
      </adc-table-body>
    </adc-table>
  `;
};

export const Expandable = (args) => ExpandableTemplate(args);

Expandable.parameters = {
  jest: "table.test.ts"
};

Expandable.play = async ({ canvasElement }) => {
  const tableHeaderExpandRow = canvasElement.querySelector("adc-table-header-expand-row");
  const headerExpandButton = tableHeaderExpandRow.shadowRoot.querySelector(
    ".adc-table-expand--button"
  );

  const expandedRows = canvasElement.querySelectorAll("adc-table-expanded-row");

  const firstRow = canvasElement.querySelector('adc-table-expand-row[data-row-id="1"]');
  const firstRowButton = firstRow.shadowRoot.querySelector(".adc-table-expand--button");
  const firstExpandedRow = expandedRows[0];

  const secondRow = canvasElement.querySelector('adc-table-expand-row[data-row-id="2"]');
  const secondRowButton = secondRow.shadowRoot.querySelector(".adc-table-expand--button");
  const secondExpandedRow = expandedRows[1];

  const thirdRow = canvasElement.querySelector('adc-table-expand-row[data-row-id="3"]');
  const thirdRowButton = thirdRow.shadowRoot.querySelector(".adc-table-expand--button");
  const thirdExpandedRow = expandedRows[2];

  // 🔧  Assert - All Rows are collapsed

  // 🔧 Table Header is collapsed
  await expect(tableHeaderExpandRow).not.toHaveAttribute("expanded");

  // 🔧 "First Row" & "First row expanded" is collapsed
  await expect(firstRow).not.toHaveAttribute("expanded");
  await expect(firstExpandedRow).not.toHaveAttribute("expanded");

  // 🔧 "second Row" & "second row expanded" is collapsed
  await expect(secondRow).not.toHaveAttribute("expanded");
  await expect(secondExpandedRow).not.toHaveAttribute("expanded");

  // 🔧 "third Row" & "third row expanded" is collapsed
  await expect(thirdRow).not.toHaveAttribute("expanded");
  await expect(thirdExpandedRow).not.toHaveAttribute("expanded");

  // 👇 Simulate - Expand All
  await userEvent.click(headerExpandButton);

  // 🔧  Assert - All Rows are expanded

  // 🔧 Table Header is expanded
  await expect(tableHeaderExpandRow).toHaveAttribute("expanded");

  // 🔧 "First Row" & "First row expanded" is expanded
  await expect(firstRow).toHaveAttribute("expanded");
  await expect(firstExpandedRow).toHaveAttribute("expanded");

  // 🔧 "second Row" & "second row expanded" is collapsed
  await expect(secondRow).toHaveAttribute("expanded");
  await expect(secondExpandedRow).toHaveAttribute("expanded");

  // 🔧 "third Row" & "third row expanded" is collapsed
  await expect(thirdRow).toHaveAttribute("expanded");
  await expect(thirdExpandedRow).toHaveAttribute("expanded");

  // 👇 Simulate - Collapse First
  await userEvent.click(firstRowButton);

  // 🔧  Assert - First Row is collapsed & header is collapsed

  // 🔧 Table Header is expanded
  await expect(tableHeaderExpandRow).not.toHaveAttribute("expanded");

  // 🔧 "First Row" & "First row expanded" is expanded
  await expect(firstRow).not.toHaveAttribute("expanded");
  await expect(firstExpandedRow).not.toHaveAttribute("expanded");

  // 👇 Simulate - Collapse Second
  await userEvent.click(secondRowButton);

  // 🔧  Assert - Second Row is collapsed

  // 🔧 "Second Row" & "Second row expanded" is collapsed
  await expect(secondRow).not.toHaveAttribute("expanded");
  await expect(secondExpandedRow).not.toHaveAttribute("expanded");

  // 👇 Simulate - Collapse Third
  await userEvent.click(thirdRowButton);

  // 🔧  Assert - Third Row is collapsed

  // 🔧 "third Row" & "third row expanded" is collapsed
  await expect(thirdRow).not.toHaveAttribute("expanded");
  await expect(thirdExpandedRow).not.toHaveAttribute("expanded");

  // 🔧  Assert - All Rows are collapsed

  // 🔧 Table Header is collapsed
  await expect(tableHeaderExpandRow).not.toHaveAttribute("expanded");

  // 🔧 "First Row" & "First row expanded" is collapsed
  await expect(firstRow).not.toHaveAttribute("expanded");
  await expect(firstExpandedRow).not.toHaveAttribute("expanded");

  // 🔧 "second Row" & "second row expanded" is collapsed
  await expect(secondRow).not.toHaveAttribute("expanded");
  await expect(secondExpandedRow).not.toHaveAttribute("expanded");

  // 🔧 "third Row" & "third row expanded" is collapsed
  await expect(thirdRow).not.toHaveAttribute("expanded");
  await expect(thirdExpandedRow).not.toHaveAttribute("expanded");
};
