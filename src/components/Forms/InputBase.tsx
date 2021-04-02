import ErrorMessage from './ErrorMessage';
import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components';
import AppText from '../AppText';
import { InputContainer } from '~/components/Forms/styles';
import IconName from '~/types/icons';
import styled from '~/config/styled-components';
import { capitalize } from '~/Helpers/capitalize';

interface Props {
	name: string;
	label: string;
	container?: boolean;
	icon?: IconName;
	onIconPress?: () => void;
}

const InputBase: React.FC<Props> = ({
	name,
	icon,
	label,
	onIconPress,
	container = true,
	children,
}) => {
	const theme = useContext(ThemeContext);

	return (
		<Container>
			<AppText type="label">{capitalize(label)}</AppText>
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
