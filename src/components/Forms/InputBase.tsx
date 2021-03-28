import AppText from '../AppText';
import ErrorMessage from './ErrorMessage';
import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components';
import { InputContainer } from '~/components/Forms/styles';
import IconName from '~/types/icons';
import styled from '~/config/styled-components';
import { capitalize } from '~/Helpers/capitalize';

interface Props {
	name: string;
	label: string;
	icon?: IconName;
	onIconPress?: () => void;
}

const InputBase: React.FC<Props> = ({
	name,
	icon,
	label,
	onIconPress,
	children,
}) => {
	const theme = useContext(ThemeContext);

	return (
		<Container>
			<AppText>{capitalize(label)}</AppText>
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
			<ErrorMessage name={name} />
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
