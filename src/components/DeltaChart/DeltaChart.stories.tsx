import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DeltaChart } from ".";

export default {
  title: "Components/DeltaChart",
  component: DeltaChart,
} as ComponentMeta<typeof DeltaChart>;

const Template: ComponentStory<typeof DeltaChart> = (args) => (
  <DeltaChart {...args} />
);

export const Example = Template.bind({});
Example.args = {};
