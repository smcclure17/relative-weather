import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VoroinoiLayout } from ".";

export default {
  title: "Components/VoroinoiLayout",
  component: VoroinoiLayout,
} as ComponentMeta<typeof VoroinoiLayout>;

const Template: ComponentStory<typeof VoroinoiLayout> = (args) => (
  <VoroinoiLayout {...args} />
);

export const Example = Template.bind({});
Example.args = {};
