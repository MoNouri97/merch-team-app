import React, { createContext, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AppText from '~/components/AppText';
import ProgressBar from '~/components/Home/ProgressBar';
import BottomSheet from '~/components/Shared/BottomSheet';
import CheckMark from '~/components/Shared/CheckMark';
import styled from '~/config/styled-components';

type ModalState = {
	visible: boolean;
	showProgress: (p: number) => void;
	showText: (t: string) => void;
	hide: () => void;
};
type ModalType = 'text' | 'progress';
export const ModalContext = createContext<ModalState | null>(null);
export default ModalContext;

export const ModalContextProvider: React.FC = ({ children }) => {
	const [visible, setVisible] = useState(false);
	const [done, setDone] = useState(false);
	const [type, setType] = useState<ModalType>('text');
	const [text, setText] = useState('');
	const [progress, setProgress] = useState(0);

	const showText = useCallback(
		(t: string) => {
			setType('text');
			setText(t);
			!visible && setVisible(true);
		},
		[visible, setVisible, setType, setText]
	);

	const showProgress = useCallback(
		(p: number) => {
			setType('progress');
			setProgress(p);
			!visible && setVisible(true);
		},
		[visible, setVisible, setType, setProgress]
	);

	const hide = useCallback(() => {
		setDone(true);
		setTimeout(() => {
			setVisible(false);
			setDone(false);
		}, 500);
	}, [setVisible]);

	// const Content = () => {
	// 	return (

	// 	)
	// }
	return (
		<ModalContext.Provider value={{ showProgress, showText, hide, visible }}>
			<BottomSheet
				center
				modalProps={{
					visible,
					onRequestClose: () => setVisible(false),
					animationType: 'fade',
				}}
			>
				<Container>
					{done ? (
						<Center>
							<CheckMark checked scale={2} />
						</Center>
					) : type == 'progress' ? (
						<Container>
							<AppText size={18}>Veiller patienter</AppText>
							<AppText size={18}>{progress}%</AppText>
							<ProgressBar percent={progress} />
						</Container>
					) : (
						<>
							<AppText style={{ textAlign: 'center' }} type="title">
								{text}
							</AppText>
							<ActivityIndicator color="purple" size={'large'} />
						</>
					)}
				</Container>
			</BottomSheet>
			{children}
		</ModalContext.Provider>
	);
};

const Container = styled.View`
	align-items: stretch;
	justify-content: space-evenly;
	flex: 1;
	padding: 10px;
`;
const Center = styled.View`
	align-items: center;
	justify-content: center;
	flex: 1;
	padding: 10px;
`;
