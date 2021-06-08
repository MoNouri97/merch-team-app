import React from 'react';
import {
	Modal,
	ModalProps,
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import styled from '~/config/styled-components';

export type BottomSheetProps = {
	containerStyle?: StyleProp<ViewStyle>;
	modalProps?: ModalProps;
	center?: boolean;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
	containerStyle,
	modalProps,
	children,
	center = false,
	...props
}) => {
	const ContentContainer = center ? CloseSpaceCenter : CloseSpace;
	return (
		<Modal
			statusBarTranslucent
			animationType="slide"
			transparent
			{...modalProps}
		>
			<SafeContainer
				style={StyleSheet.flatten([containerStyle && containerStyle])}
				{...props}
			>
				<ContentContainer onPress={modalProps?.onRequestClose}>
					<Content>{children}</Content>
				</ContentContainer>
			</SafeContainer>
		</Modal>
	);
};

const CloseSpace = styled(Pressable)`
	flex-grow: 1;
	flex-direction: column-reverse;
	display: flex;
`;
const CloseSpaceCenter = styled(Pressable)`
	flex-grow: 1;
	flex-direction: column-reverse;
	padding: 10px;
	justify-content: center;
`;
const SafeContainer = styled(View)`
	flex: 1;
	background-color: rgba(0, 0, 0, 0.5);
	flex-direction: column-reverse;
`;
const Content = styled.Pressable`
	min-height: 200px;
	flex-shrink: 1;
	flex-grow: 0;
	/* align-items: center; */
	justify-content: center;
	background: ${({ theme }) => theme.colors.white};
	elevation: 10;
	padding: 10px;
	border-radius: ${({ theme }) => theme.borderRadiusLarge};
`;
export default BottomSheet;
