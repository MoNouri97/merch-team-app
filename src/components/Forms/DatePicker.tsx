import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import {} from 'date-fns';
import { useField } from 'formik';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import displayDate from '~/Helpers/displayDate';
import InputBase from './InputBase';

interface IProps {
	name: string;
	label?: string;
}

const DatePicker: React.FC<IProps> = ({ name, label }) => {
	const [{ value: date }, , { setValue: setDate }] = useField<Date>(name);
	// const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const onChange = (_event: Event, selectedDate?: Date) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	const showDatePicker = () => {
		setShow(true);
	};

	return (
		<InputBase label={label ?? name} name={name} icon="calendar">
			<Touchable onPress={showDatePicker}>
				<AppText type="label">{displayDate(date)}</AppText>
			</Touchable>
			{/* TODO fix this on ios */}
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
