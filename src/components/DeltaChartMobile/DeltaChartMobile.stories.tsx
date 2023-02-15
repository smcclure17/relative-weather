import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DeltaChartMobile } from ".";

export default {
  title: "Components/DeltaChartMobile",
  component: DeltaChartMobile,
} as ComponentMeta<typeof DeltaChartMobile>;

const Template: ComponentStory<typeof DeltaChartMobile> = (args) => (
  <DeltaChartMobile {...args} />
);

export const Example = Template.bind({});
Example.args = {};
