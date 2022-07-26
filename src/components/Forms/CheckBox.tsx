import { useField } from 'formik';
import React from 'react';
import AppText from '~/components/AppText';
import InputBase from '~/components/Forms/InputBase';
import { Press } from '~/components/Shared/Btn';
import CheckMark from '~/components/Shared/CheckMark';
import styled from '~/config/styled-components';

interface IProps {
	name: string;
	label?: string;
	text?: string;
}

const CheckBox: React.FC<IProps> = ({ name, label, text }) => {
	const [{ value }, , { setValue }] = useField(name);
	return (
		<InputBase name={name} label={label ?? name} container={false}>
			<Container onPress={() => setValue(!value, false)}>
				<State>
					<CheckMark checked={value as boolean} />
				</State>

				<TextContainer>
					<AppText numberOfLines={1} size={16}>
						{text}
					</AppText>
				</TextContainer>
			</Container>
		</InputBase>
	);
};

const Container = styled(Press)`
	flex-direction: row;
	align-items: center;
	flex-shrink: 0;
	flex-grow: 1;
	padding-vertical: 10px;
`;
const State = styled.View`
	justify-content: center;
	align-items: center;
	margin-right: 10px;
`;
const TextContainer = styled.View`
	margin-left: 10px;
	flex: 1;
	/* max-width: 80%; */
`;
export default CheckBox;
