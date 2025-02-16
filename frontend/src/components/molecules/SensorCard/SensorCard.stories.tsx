import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SensorCard from ".";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

const meta: Meta<typeof SensorCard> = {
  title: "Componentes/SensorCard",
  component: SensorCard,
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof SensorCard>;

export const Padrao: Story = {
  args: {
    title: "Sensor de Temperatura",
    value: "36°C",
    icon: <AccessAlarmIcon />,
  },
};
