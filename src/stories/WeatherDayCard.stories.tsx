import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WeatherType } from '../data/weather';
import { DateTime } from "luxon"
import { WeatherDayCard } from '../Components/WeatherDayCard/WeatherDayCard';

export default {
  title: 'Example/WeatherDayCard',
  component: WeatherDayCard,
} as ComponentMeta<typeof WeatherDayCard>;

// why does this break?
const data = {
	temperature: 57,
	description: "It's chilly!",
	tag: WeatherType.OBSERVATION,
	timestamp: DateTime.now()
}

const Template: ComponentStory<typeof WeatherDayCard> = (args) => <WeatherDayCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    weatherDay: data
};

