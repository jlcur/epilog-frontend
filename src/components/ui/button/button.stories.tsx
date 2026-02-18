import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button/button";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: "Button",
		variant: "default",
	},
};
