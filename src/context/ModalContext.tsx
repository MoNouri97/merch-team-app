import React, { createContext, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import AppText from '~/components/AppText';
import ProgressBar from '~/components/Home/ProgressBar';
import BottomSheet from '~/components/Shared/BottomSheet';
import CheckMark from '~/components/Shared/CheckMark';
import styled from '~/config/styled-components';

type ModalState = {
	visible: boolean;
	showProgress: (p: number) => void;
	showText: (t: string, callback?: () => void) => void;
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
	// const [onClose, setOnClose] = useState<() => void>();

	React.useEffect(() => {
		console.log(type);
	}, [type]);

	const showText = (t: string, callback?: () => void) => {
		setType('text');
		setText(t);
		// setOnClose(callback);
		setVisible(true);
	};

	const showProgress = (p: number) => {
		// setOnClose(undefined);
		setType('progress');
		setProgress(p);
		setVisible(true);
	};

	const hide = useCallback(() => {
		// setOnClose(undefined);

		if (type == 'text') {
			return setVisible(false);
		}
		setDone(true);
		setTimeout(() => {
			setVisible(false);
			setDone(false);
		}, 200);
	}, [setVisible, type, setDone]);
	const onRequestClose = useMemo(
		() => (type == 'text' ? hide : undefined),
		[type]
	);
	const { colors } = useTheme();
	return (
		<ModalContext.Provider value={{ showProgress, showText, hide, visible }}>
			<BottomSheet
				center
				modalProps={{
					visible,
					onRequestClose,
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
							<AppText size={18} type="label">
								Veiller patienter
							</AppText>
							{progress ? (
								<>
									<AppText size={18}>{progress}%</AppText>
									<ProgressBar percent={progress} />
								</>
							) : (
								<ActivityIndicator color={colors.primary} size="large" />
							)}
						</Container>
					) : (
						<>
							<AppText
								style={{ textAlign: 'center' }}
								type="label"
								numberOfLines={99}
							>
								{text}
							</AppText>
						</>
					)}
				</Container>
			</BottomSheet>
			{children}
		</ModalContext.Provider>
	);
};

const Container = styled.View`
	align-items: center;
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
