import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { ThemeContext } from 'styled-components';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

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
	return (
		<Container disabled={disabled || loading} primary={primary}>
			<Pressable
				style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
				disabled={disabled || loading}
				onPress={onPress}
				android_ripple={{
					borderless: false,
					color: !primary ? theme.colors.primary : theme.colors.white,
				}}
			>
				<InnerBtn>
					{typeof children === 'string' ? (
						<BtnText primary={primary}>
							{!loading ? children : <Feather size={20} name="loader" />}
						</BtnText>
					) : (
						children
					)}
				</InnerBtn>
			</Pressable>
		</Container>
	);
};
const InnerBtn = styled.View`
	align-items: center;
	justify-content: center;
	padding: 15px 20px;
	overflow: hidden;
`;

const Container = styled.View<{ primary?: boolean; disabled?: boolean }>`
	overflow: hidden;
	border-radius: 100px;
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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
