import { type IntlFormatDistanceOptions, intlFormatDistance } from "date-fns";

export const formatDateOptions: IntlFormatDistanceOptions = {
	numeric: "always",
	style: "short",
};

export function convertDateToDistance(date: Date): string {
	return intlFormatDistance(
		new Date(date),
		new Date(Date.now()),
		formatDateOptions,
	);
}
