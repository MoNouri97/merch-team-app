import Btn from '../Btn';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import InputBase from './InputBase';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import { displayDate } from '~/Helpers/displayDate';

interface IProps {
	name: string;
}

const DatePicker: React.FC<IProps> = ({ name }) => {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const onChange = (_event: Event, selectedDate?: Date) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	const showDatepicker = () => {
		setShow(true);
	};

	return (
		<InputBase label="date" name={name} icon="calendar">
			<Touchable onPress={showDatepicker}>
				<AppText type="label">{displayDate(date)}</AppText>
			</Touchable>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode="date"
					display="spinner"
					onChange={onChange}
				/>
			)}
		</InputBase>
	);
};
const Touchable = styled.TouchableOpacity`
	flex: 1;
	padding: 15px;
	align-items: flex-start;
	justify-content: center;
`;
export default DatePicker;
