import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DeltaCard } from "./index";

export default {
  title: "Components/DeltaCard",
  component: DeltaCard,
} as ComponentMeta<typeof DeltaCard>;

const Template: ComponentStory<typeof DeltaCard> = (args) => (
  <DeltaCard {...args} />
);

export const Example = Template.bind({});
Example.args = {};
