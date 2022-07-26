/* eslint-disable no-param-reassign */
import React from 'react';
import { TextProps } from 'react-native';
import styled from '~/config/styled-components';
import { LABEL, SUBTITLE, TITLE } from './styles';

interface IProps {
	size?: number;
	font?: 'DMSans_400Regular' | 'DMSans_500Medium' | 'DMSans_700Bold';
	type?: 'title' | 'subtitle' | 'label';
	color?: 'light' | 'dark' | 'dimmed' | 'primary';
}

const AppText: React.FC<IProps & TextProps> = ({
	children,
	style,
	type,
	...props
}) => {
	if (type === 'title') {
		props = { ...TITLE, ...props };
	}
	if (type === 'subtitle') {
		props = { ...SUBTITLE, ...props };
	}
	if (type === 'label') {
		props = { ...LABEL, ...props };
	}

	return (
		<Text numberOfLines={1} {...props} style={[style]}>
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
				return theme.colors.gray[4];
			case 'primary':
				return theme.colors.primary;
			case 'dark':
			case undefined:
				return theme.colors.black;
			default:
				return color;
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
