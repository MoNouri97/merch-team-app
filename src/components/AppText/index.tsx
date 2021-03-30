import React, { useEffect } from 'react';
import { LABEL, SUBTITLE, TITLE } from './styles';
import { TextProps } from 'react-native';
import styled from '~/config/styled-components';

interface IProps {
	size?: number;
	font?: 'DMSans_400Regular' | 'DMSans_500Medium' | 'DMSans_700Bold';
	type?: 'title' | 'subtitle' | 'label';
	color?: 'light' | 'dark' | 'dimmed';
}

const AppText: React.FC<IProps & TextProps> = ({
	children,
	style,
	type,
	...props
}) => {
	if (type == 'title') {
		props = { ...TITLE, ...props };
	}
	if (type == 'subtitle') {
		props = { ...SUBTITLE, ...props };
	}
	if (type == 'label') {
		props = { ...LABEL, ...props };
	}

	return (
		<Text {...props} style={[style]}>
			{children}
		</Text>
	);
};
const Text = styled.Text<IProps>`
	font-size: ${({ size }) => `${size ?? 14}px`};
	font-family: ${({ font }) => `${font ?? 'DMSans_400Regular'}`};
	color: ${({ theme, color }) => {
		switch (color) {
			case 'light':
				return theme.colors.white;
			case 'dimmed':
				return theme.colors.gray[3];
			default:
				return theme.colors.black;
		}
	}};
`;
// const styles = StyleSheet.create({
// 	text: {
// 		...Platform.select({
// 			android: {
// 				fontSize: 18,
// 				// fontFamily: 'Lato_400Regular',
// 				fontFamily: 'Roboto',
// 			},
// 			ios: {
// 				fontSize: 20,
// 				// fontFamily: 'Lato_400Regular',
// 				fontFamily: 'Avenir',
// 			},
// 		}),
// 	},
// });

export default AppText;
