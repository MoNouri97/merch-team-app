import AppScreen from '../AppScreen';
import AppText from '../AppText';
import Btn from '../Btn';
import InputBase from './InputBase';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal } from 'react-native';
import { useFormikContext } from 'formik';
import styled from '~/config/styled-components';

interface Props {
	placeholder?: string;
	label?: string;
	name: string;
	data: any[];
}
const data = [
	'hello1',
	'hello2',
	'hello3',
	'hello4',
	'hello5',
	'hello6',
	'hello7',
];
const Picker: React.FC<Props> = ({ placeholder, label, name }) => {
	const [modalShown, setModalShown] = useState(false);
	const { handleChange, values } = useFormikContext();
	const onChange = useMemo(() => handleChange(name), [name]);
	return (
		<InputBase
			label={label ?? name ?? ''}
			name={name ?? 'picker'}
			icon="chevron-down"
		>
			<Touchable onPress={() => setModalShown(!modalShown)}>
				<Modal
					onRequestClose={() => setModalShown(false)}
					visible={modalShown}
					animationType="slide"
				>
					<ListContainer>
						<FlatList
							data={data}
							keyExtractor={(item) => item}
							ItemSeparatorComponent={() => <Separator />}
							renderItem={({ item }) => (
								<PickerItem
									onPress={() => {
										setModalShown(false);
										onChange(item);
									}}
								>
									<AppText>{item}</AppText>
								</PickerItem>
							)}
						/>
					</ListContainer>
				</Modal>
				<AppText type="label" size={20} color="dark">
					{(values as any)[name] ?? 'Choisir ...'}
				</AppText>
			</Touchable>
		</InputBase>
	);
};
const Touchable = styled.TouchableOpacity`
	flex: 1;
	padding: 15px;
	align-items: flex-start;
	justify-content: center;
`;
const PickerItem = styled.TouchableOpacity`
	padding: 20px 15px;
`;
const Separator = styled.View(({ theme }) => ({
	background: theme.colors.gray[2],
	height: 1,
	margin: 5,
}));
const ListContainer = styled.SafeAreaView`
	padding-vertical: 20px;
	flex-grow: 1;
	justify-content: center;
`;
export default Picker;
