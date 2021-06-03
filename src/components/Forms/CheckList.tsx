import { useField } from 'formik';
import React from 'react';
import InputBase from '~/components/Forms/InputBase';
import { Placeholder } from '~/components/Forms/styles';
import { Press } from '~/components/Shared/Btn';
import ListItem from '~/components/Shared/ListItem';
import styled from '~/config/styled-components';
import { ListData } from '~/types/data';

interface IProps {
	data?: ListData[];
	name: string;
	label?: string;
	placeholder?: string;
}

const CheckList: React.FC<IProps> = ({
	data,
	name,
	label,
	placeholder,
	children,
}) => {
	let [{ value: selected }, { touched }, { setValue, setTouched }] =
		useField<Array<string | number>>(name);
	if (selected == undefined) selected = [];

	const handlePress = (id: string | number, toRemove: boolean) => {
		const validate = selected.length === 0 || selected.length === 1;
		if (!touched) setTouched(true);
		if (toRemove) {
			setValue(
				selected.filter((s) => s !== id),
				validate
			);

			return;
		}

		setValue([...selected, id], validate);
	};
	return (
		<InputBase name={name} label={label ?? name} container={false}>
			{children}
			<Container>
				{!data?.length ? (
					<Placeholder>{placeholder}</Placeholder>
				) : (
					data.map((item) => {
						const check = selected.includes(item.id);
						return (
							<Press
								key={`${item.id}`}
								onPress={() => handlePress(item.id, check)}
							>
								<MemItem {...{ item: item.name, check }} />
							</Press>
						);
					})
				)}
			</Container>
		</InputBase>
	);
};

const Item: React.FC<{
	item: string;
	check: boolean;
	// eslint-disable-next-line react/display-name
}> = ({ item, check }) => <ListItem header={item} withCheck checked={check} />;
const MemItem = React.memo(Item);
const Container = styled.View`
	flex-shrink: 0;
	flex-grow: 1;
`;
export default CheckList;
