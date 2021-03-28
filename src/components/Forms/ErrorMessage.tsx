import React from 'react';
import { useFormikContext } from 'formik';
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
	return <Message>{errors[name]}</Message>;
};
const Message = styled(AppText)`
	color: ${({ theme }) => theme.colors.red};
`;
export default ErrorMessage;
