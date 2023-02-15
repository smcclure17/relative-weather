import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DayCard } from ".";

export default {
  title: "Components/DayCard",
  component: DayCard,
} as ComponentMeta<typeof DayCard>;

const Template: ComponentStory<typeof DayCard> = (args) => (
  <DayCard {...args} />
);

export const Example = Template.bind({});
Example.args = {};
