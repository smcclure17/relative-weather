import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { HeroCompare } from '../Components/HeroCompare/HeroCompare';
export default {
  title: 'Example/HeroCompare',
  component: HeroCompare,
} as ComponentMeta<typeof HeroCompare>;

const Template: ComponentStory<typeof HeroCompare> = (args) => <HeroCompare {...args} />;

export const Positive = Template.bind({});
Positive.args = {
  delta: 12,
};

export const Negative = Template.bind({});
Negative.args = {
  delta: -12,
};

