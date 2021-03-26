import React from 'react';
import { TextProps } from 'react-native';
import styled from '~/config/styled-components';
import { myTheme } from '~/config/theme';

interface IProps {
	light?: boolean;
}
const AppText: React.FC<IProps & TextProps> = ({
	children,
	style,
	...props
}) => {
	return (
		<Text {...props} style={[style]}>
			{children}
		</Text>
	);
};
const Text = styled.Text<IProps>`
	font-size: 18px;
	font-family: 'Roboto';
	color: ${({ theme, light }) =>
		light ? theme.colors.white : theme.colors.black};
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
