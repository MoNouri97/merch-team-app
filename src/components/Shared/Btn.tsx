import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';
import {
	GestureResponderEvent,
	Platform,
	Pressable,
	PressableProps,
} from 'react-native';
import { ThemeContext } from 'styled-components';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

export const Press: React.FC<PressableProps> = ({ children, ...props }) => {
	const theme = useContext(ThemeContext);
	return (
		<Pressable
			style={
				Platform.OS !== 'ios'
					? undefined
					: ({ pressed }) => ({ opacity: pressed ? 0.1 : 1 })
			}
			android_ripple={{
				borderless: false,
				color: theme.colors.gray[2],
			}}
			{...props}
		>
			{children}
		</Pressable>
	);
};
interface Props {
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	disabled?: boolean;
	primary?: boolean;
	loading?: boolean;
}

const Btn: React.FC<Props> = ({
	children,
	disabled,
	onPress,
	loading = false,
	primary = false,
}) => {
	const theme = useContext(ThemeContext);
	const fgColor = React.useMemo(
		() => (!primary ? theme.colors.primary : theme.colors.white),
		[theme, primary]
	);
	return (
		<Container disabled={disabled || loading} primary={primary}>
			<Press
				disabled={disabled || loading}
				onPress={onPress}
				android_ripple={{
					borderless: false,
					color: fgColor,
				}}
			>
				<InnerBtn>
					{typeof children === 'string' ? (
						!loading ? (
							<BtnText primary={primary}>{children}</BtnText>
						) : (
							<Feather color={fgColor} size={20} name="loader" />
						)
					) : (
						children
					)}
				</InnerBtn>
			</Press>
		</Container>
	);
};
const InnerBtn = styled.View`
	align-items: center;
	justify-content: center;
	padding: 15px 20px;
	overflow: hidden;
	height: 50px;
`;

const Container = styled.View<{ primary?: boolean; disabled?: boolean }>`
	overflow: hidden;
	border-radius: 100px;
	/* opacity: ${({ disabled }) => (disabled ? 0.5 : 1)}; */
	margin: 5px;
	background-color: ${({ theme, primary }) =>
		primary ? theme.colors.primary : 'transparent'};
	border: ${({ theme, primary }) => `2px solid  ${theme.colors.primary}`};
`;

const BtnText = styled(AppText)<{ primary?: boolean }>`
	font-size: 15px;
	text-transform: capitalize;
	letter-spacing: 1px;
	color: ${({ theme, primary }) =>
		!primary ? theme.colors.primary : theme.colors.white};
`;
export default Btn;
