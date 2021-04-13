import { useField } from 'formik';
import React, { useState } from 'react';
import { FlatList, Modal } from 'react-native';
import styled from '~/config/styled-components';
import AppText from '../AppText';
import InputBase from './InputBase';

interface Props {
	placeholder?: string;
	label?: string;
	name: string;
	data: { id: string | number; name: string }[];
}

const Picker: React.FC<Props> = ({ placeholder, label, name, data }) => {
	const [modalShown, setModalShown] = useState(false);
	const [{ value }, , { setValue, setTouched }] = useField(name);

	const closeModal = () => {
		setModalShown(false);
		setTouched(true);
	};

	return (
		<InputBase
			label={label ?? name ?? ''}
			name={name ?? 'picker'}
			icon="chevron-down"
			onIconPress={() => setModalShown(true)}
		>
			<Touchable onPress={() => setModalShown(true)}>
				<Modal
					onRequestClose={closeModal}
					visible={modalShown}
					animationType="slide"
				>
					<ListContainer>
						<FlatList
							data={data}
							keyExtractor={(item) => item.id.toString()}
							ItemSeparatorComponent={() => <Separator />}
							renderItem={({ item }) => (
								<PickerItem
									onPress={() => {
										setModalShown(false);
										setValue(item.name, true);
									}}
								>
									<AppText>{item.name}</AppText>
								</PickerItem>
							)}
						/>
					</ListContainer>
				</Modal>

				{value === '' ? (
					<AppText type="label">{placeholder ?? 'Choisir ...'}</AppText>
				) : (
					<AppText type="label" color="dark">
						{value}
					</AppText>
				)}
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
export default React.memo(Picker);
