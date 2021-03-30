interface TextType {
	size?: 30 | 20 | 16;
	font?: 'DMSans_400Regular' | 'DMSans_500Medium' | 'DMSans_700Bold';
	color?: 'light' | 'dark' | 'dimmed';
}

export const TITLE: TextType = {
	size: 30,
	color: 'dark',
	font: 'DMSans_700Bold',
};
export const SUBTITLE: TextType = {
	size: 20,
	color: 'dark',
	font: 'DMSans_500Medium',
};
export const LABEL: TextType = {
	size: 16,
	color: 'dark',
	font: 'DMSans_400Regular',
};
