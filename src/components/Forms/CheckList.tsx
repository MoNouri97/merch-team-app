import { useField } from 'formik';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Fake } from '~/types/data';
import ListItem from '../Shared/ListItem';
import InputBase from './InputBase';

interface IProps {
	data: Fake[];
	name: string;
	label?: string;
}

const CheckList: React.FC<IProps> = ({ data, name, label }) => {
	const [{ value: selected }, , { setValue }] = useField<number[]>(name);

	const handlePress = (idx: number, toRemove: boolean) => {
		if (toRemove) {
			setValue(
				selected.filter((s) => s !== idx),
				false
			);
			return;
		}
		setValue([...selected, idx], false);
	};
	return (
		<InputBase name={name} label={label ?? name} container={false}>
			{data.map((item, i) => {
				const check = selected.includes(i);
				return (
					<TouchableOpacity
						key={`${item.id}`}
						onPress={() => handlePress(i, check)}
					>
						<MemItem {...{ item: item.name, check }} />
					</TouchableOpacity>
				);
			})}
		</InputBase>
	);
};

const Item: React.FC<{
	item: string;
	check: boolean;
	// eslint-disable-next-line react/display-name
}> = ({ item, check }) => <ListItem header={item} withCheck checked={check} />;
const MemItem = React.memo(Item);

export default CheckList;
