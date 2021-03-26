import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
	GestureResponderEvent,
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

interface Props {
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	style?: StyleProp<ViewStyle>;
	primary?: boolean;
}

const Btn: React.FC<Props> = ({
	children,
	style,
	onPress,
	primary = false,
}) => {
	const theme = useContext(ThemeContext);
	return (
		<Container primary={primary}>
			<InnerBtn
				style={[style]}
				onPress={onPress}
				android_ripple={{
					borderless: false,
					color: !primary ? theme.colors.primary : theme.colors.white,
				}}
			>
				{typeof children == 'string' ? (
					<BtnText primary={primary}>{children}</BtnText>
				) : (
					children
				)}
			</InnerBtn>
		</Container>
	);
};
const InnerBtn = styled.Pressable`
	align-items: center;
	justify-content: center;
	padding: 15px 20px;
	overflow: hidden;
`;
const Container = styled.View<{ primary?: boolean }>`
	overflow: hidden;
	border-radius: 100px;
	width: 100%;
	margin: 5px;
	background-color: ${({ theme, primary }) =>
		primary ? theme.colors.primary : 'transparent'};
	border: ${({ theme, primary }) => `2px solid  ${theme.colors.primary}`};
`;

const BtnText = styled(AppText)<{ primary?: boolean }>`
	font-size: 15px;
	text-transform: uppercase;
	font-weight: bold;
	color: ${({ theme, primary }) =>
		!primary ? theme.colors.primary : theme.colors.white};
`;
export default Btn;
