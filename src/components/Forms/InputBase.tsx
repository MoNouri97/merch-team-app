import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { InputContainer } from '~/components/Forms/styles';
import styled from '~/config/styled-components';
import IconName from '~/types/icons';
import AppText from '../AppText';
import ErrorMessage from './ErrorMessage';

const createLabel = (word: string) => {
	const wordArr = word.split('.');
	const l = wordArr.length;
	word = wordArr[l - 1];
	return word.charAt(0).toUpperCase() + word.slice(1);
};

interface Props {
	name: string;
	label: string;
	container?: boolean;
	icon?: IconName;
	onIconPress?: () => void;
	hideError?: boolean;
}

const InputBase: React.FC<Props> = ({
	name,
	icon,
	label,
	onIconPress,
	container = true,
	hideError = false,
	children,
}) => {
	const theme = useContext(ThemeContext);

	return (
		<Container>
			{label !== '' && <AppText type="label">{createLabel(label)}</AppText>}
			{container ? (
				<InputContainer>
					{children}
					{icon && (
						<Icon
							onPress={onIconPress}
							name={icon}
							size={20}
							color={theme.colors.primary}
						/>
					)}
				</InputContainer>
			) : (
				children
			)}
			{!hideError && <ErrorMessage name={name} />}
		</Container>
	);
};

const Container = styled.View`
	margin-bottom: 20px;
	padding: 0;
`;
const Icon = styled(Feather)`
	font-size: 20px;
	padding: 17px;
`;

export default InputBase;
