import React, { createContext, useMemo, useState } from 'react';
import { ActivityIndicator, AlertButton } from 'react-native';
import { useTheme } from 'styled-components';
import AppText from '~/components/AppText';
import BottomSheet from '~/components/Shared/BottomSheet';
import Btn from '~/components/Shared/Btn';
import CheckMark from '~/components/Shared/CheckMark';
import styled from '~/config/styled-components';

type ModalValue = {
	show: (t?: ModalOptions) => void;
	showProgress: (t?: ModalOptions) => void;
	hide: () => void;
	hideProgress: () => void;
};

type ModalType = 'text' | 'progress';
export const ModalContext = createContext<ModalValue | null>(null);
export default ModalContext;

type ModalOptions = {
	content?: string;
	type?: ModalType;
	buttons?: AlertButton[];
};
type ModalState = ModalOptions & { visible: boolean; type: ModalType };
const init: ModalState = {
	type: 'text',
	visible: false,
	buttons: [],
	content: 'Veuillez patienter',
};
export const ModalContextProvider: React.FC = ({ children }) => {
	const [done, setDone] = useState(false);
	const [state, setState] = useState<ModalState>(init);

	const show = (options?: ModalOptions) => {
		setDone(false);
		setState({
			...state,
			...options,
			visible: true,
		});
	};
	const showProgress = (options?: ModalOptions) => {
		show({ ...init, ...options, type: 'progress' });
	};
	const hideProgress = () => {
		setDone(true);
		setTimeout(() => {
			setDone(false);
			setState(init);
		}, 800);
	};

	const hide = () => {
		return setState(init);
	};

	const onRequestClose = useMemo(
		() => (state.type == 'text' ? hide : undefined),
		[state.type]
	);
	const { colors } = useTheme();
	return (
		<>
			<BottomSheet
				center
				modalProps={{
					visible: state.visible,
					onRequestClose,
					animationType: 'fade',
				}}
			>
				<TextContainer>
					{done ? (
						<Center>
							<CheckMark checked scale={2} />
						</Center>
					) : state.type == 'progress' ? (
						<Container>
							<AppText size={18} type="label">
								{state.content}
							</AppText>
							<ActivityIndicator
								style={{ marginTop: 20 }}
								color={colors.primary}
								size="large"
							/>
						</Container>
					) : (
						<>
							<AppText
								style={{ textAlign: 'center' }}
								// type="label"
								size={16}
								numberOfLines={10}
							>
								{state.content}
							</AppText>
							<Row>
								{state.buttons?.map((btn) => (
									<Col key={btn.text}>
										<Btn
											onPress={() => {
												btn.onPress && btn.onPress();
												hide();
											}}
										>
											{btn.text}
										</Btn>
									</Col>
								))}
							</Row>
						</>
					)}
				</TextContainer>
			</BottomSheet>
			<ModalContext.Provider value={{ showProgress, show, hide, hideProgress }}>
				{children}
			</ModalContext.Provider>
		</>
	);
};

const Container = styled.View`
	align-items: center;
	justify-content: space-between;
	padding: 10px;
`;
const TextContainer = styled.View`
	justify-content: space-between;
	flex-grow: 1;
	padding: 10px;
`;
const Center = styled.View`
	align-items: center;
	justify-content: center;
	/* flex: 1; */
	padding: 10px;
`;
const Row = styled.View`
	flex-direction: row;
	justify-content: space-around;
	align-self: stretch;
`;
const Col = styled.View`
	flex: 1;
`;
