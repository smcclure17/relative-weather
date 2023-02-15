/**
 * Plop is a tool that saves time and helps scaffolding code with consistency.
 *
 * See https://plopjs.com/documentation/ for more details.
 */
import _ from "lodash";

const templateComponentMain = prepareTemplate(`
import React from "react";

export interface {{pascalCase name}}Props {

}

export const {{pascalCase name}} = (props: {{pascalCase name}}Props) => {
  return <>{{pascalCase name}}</>;
};`);

const templateComponentStories = prepareTemplate(`
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { {{pascalCase name}} } from ".";

export default {
  title: "Components/{{pascalCase name}}",
  component: {{pascalCase name}},
} as ComponentMeta<typeof {{pascalCase name}}>;

const Template: ComponentStory<typeof {{pascalCase name}}> = (args) => (
  <{{pascalCase name}} {...args} />
);

export const Example = Template.bind({});
Example.args = {};
`);

const templateComponentIndex = prepareTemplate(`
export * from "./{{pascalCase name}}";
`);

const componentBasePath = "src/components";

function plopConfig(/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator("component", {
    description: "Creates a component module with stories, styles and index.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/index.ts`,
        template: templateComponentIndex,
      },
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        template: templateComponentMain,
      },
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx`,
        template: templateComponentStories,
      },
    ],
  });
}

export default plopConfig;

function prepareTemplate(srcTemplate) {
  return _.trimStart(srcTemplate);
}
