import { Feather } from '@expo/vector-icons';
import { useFormikContext } from 'formik';
import React from 'react';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

interface IProps {
	name: string;
}

const ErrorMessage: React.FC<IProps> = ({ name }) => {
	const { errors, touched } = useFormikContext();
	if (!(touched[name] && errors[name])) {
		return null;
	}
	return (
		<Message numberOfLines={2}>
			<Feather size={15} name="alert-circle" />
			{` ${errors[name]}`}
		</Message>
	);
};
const Message = styled(AppText)`
	color: ${({ theme }) => theme.colors.red};
`;
export default ErrorMessage;
