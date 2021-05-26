import { Feather } from '@expo/vector-icons';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

interface IProps {
	name: string;
}

const ErrorMessage: React.FC<IProps> = ({ name }) => {
	const [{}, { error, touched }, {}] = useField(name);
	const { submitCount } = useFormikContext();

	if (!(error && (touched || submitCount > 0))) {
		return null;
	}
	return (
		<Message numberOfLines={2}>
			<Feather size={15} name="alert-circle" />
			{` ${error}`}
		</Message>
	);
};
const Message = styled(AppText)`
	color: ${({ theme }) => theme.colors.red};
`;
export default React.memo(ErrorMessage, (p, n) => p.name === n.name);
