import React from 'react';
import {
	Modal,
	ModalProps,
	ScrollView,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '~/config/styled-components';

export type BottomSheetProps = {
	containerStyle?: StyleProp<ViewStyle>;
	modalProps?: ModalProps;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
	containerStyle,
	modalProps,
	children,
	...props
}) => (
	<Modal animationType="slide" transparent {...modalProps}>
		<SafeContainer
			style={StyleSheet.flatten([containerStyle && containerStyle])}
			{...props}
		>
			<Content>
				<ScrollView>{children}</ScrollView>
			</Content>

			<CloseSpace onPress={modalProps?.onRequestClose}>
				{/* <AppText>hi</AppText> */}
			</CloseSpace>
		</SafeContainer>
	</Modal>
);

const CloseSpace = styled.TouchableOpacity`
	flex-grow: 1;
	align-items: center;
	justify-content: center;
`;
const SafeContainer = styled(SafeAreaView)`
	flex: 1;
	background-color: rgba(0, 0, 0, 0.2);
	flex-direction: column-reverse;
`;
const Content = styled.View`
	background: ${({ theme }) => theme.colors.white};
	padding: 10px;
`;
export default BottomSheet;
