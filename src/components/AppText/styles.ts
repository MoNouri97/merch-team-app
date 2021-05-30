interface TextType {
	size?: 30 | 20 | 16;
	font?: 'DMSans_400Regular' | 'DMSans_500Medium' | 'DMSans_700Bold';
	color?: 'light' | 'dark' | 'dimmed' | 'primary';
}

export const TITLE: TextType = {
	size: 30,
	color: 'primary',
	font: 'DMSans_700Bold',
};
export const SUBTITLE: TextType = {
	size: 20,
	color: 'dark',
	font: 'DMSans_500Medium',
};
export const LABEL: TextType = {
	size: 16,
	color: 'dimmed',
	font: 'DMSans_400Regular',
};
