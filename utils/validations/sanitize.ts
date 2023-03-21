export const sanitize = (target: string): string => {
	if (target) return target.trim();
	return "";
};
