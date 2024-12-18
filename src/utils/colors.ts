/**
 *
 * @param color
 * @returns number
 */
const getLuminance = (color: string) => {
	const rgb = parseInt(color.slice(1), 16); // Convierte el color hex a RGB
	const r = (rgb >> 16) & 0xff;
	const g = (rgb >> 8) & 0xff;
	const b = (rgb >> 0) & 0xff;

	const rsr = r / 255;
	const gsr = g / 255;
	const bsr = b / 255;

	const rsc = rsr <= 0.03928 ? rsr / 12.92 : Math.pow((rsr + 0.055) / 1.055, 2.4);
	const gsc = gsr <= 0.03928 ? gsr / 12.92 : Math.pow((gsr + 0.055) / 1.055, 2.4);
	const bsc = bsr <= 0.03928 ? bsr / 12.92 : Math.pow((bsr + 0.055) / 1.055, 2.4);

	return 0.2126 * rsc + 0.7152 * gsc + 0.0722 * bsc;
};

/**
 *
 * @param backgroundColor
 * @returns
 */
export const getTextColor = (backgroundColor: string) => {
	const luminance = getLuminance(backgroundColor);
	return luminance > 0.5 ? "#000000" : "#ffffff";
};
