import { Feather } from '@expo/vector-icons';
import { useField } from 'formik';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, View } from 'react-native';
import styled from '~/config/styled-components';
import AppText from '../AppText';
import InputBase from './InputBase';

const EmptyListItem = () => (
	<View style={styles.listContent}>
		<AppText style={styles.center} type="label">
			Pas De Données...
		</AppText>
	</View>
);
const ClearSelectionBtn: React.FC<{ onPress: () => void }> = ({ onPress }) => (
	<PickerItem onPress={onPress}>
		<Feather name="x" size={24} />
	</PickerItem>
);
interface Props {
	placeholder?: string;
	label?: string;
	name: string;
	data?: { id: string | number; name: string }[];
	onOpen?: () => void;
}

const Picker: React.FC<Props> = ({
	placeholder,
	label,
	name,
	data,
	onOpen,
}) => {
	const [modalShown, setModalShown] = useState(false);
	// const [selected, setSelected] = useState('');
	const [{ value }, , { setValue, setTouched }] = useField(name);

	const selected = useMemo(() => {
		if (!value) return '';
		if (!data) return '';
		for (const item of data) {
			if (item.id == value) return item.name;
		}
		return '';
	}, [value]);

	const closeModal = () => {
		setModalShown(false);
		setTouched(true);
	};
	const openModal = async () => {
		setModalShown(true);
		if (onOpen) {
			onOpen();
		}
	};
	const clear = () => {
		setModalShown(false);
		setTimeout(() => {
			setValue(undefined);
		}, 0);
	};

	return (
		<InputBase
			label={label ?? name ?? ''}
			name={name ?? 'picker'}
			icon="chevron-down"
			onIconPress={openModal}
		>
			<Touchable onPress={openModal}>
				<Modal
					onRequestClose={closeModal}
					visible={modalShown}
					animationType="slide"
				>
					<ListContainer>
						<ClearSelectionBtn onPress={clear} />
						<FlatList
							contentContainerStyle={styles.listContent}
							data={data}
							ListEmptyComponent={EmptyListItem}
							keyExtractor={(item) => item.id.toString()}
							ItemSeparatorComponent={Separator}
							renderItem={({ item }) => (
								<PickerItem
									onPress={() => {
										setModalShown(false);
										setTimeout(() => {
											setValue(item.id);
										}, 0);
									}}
								>
									<AppText>{item.name}</AppText>
								</PickerItem>
							)}
						/>
					</ListContainer>
				</Modal>

				{!value ? (
					<AppText type="label">{placeholder ?? 'Choisir ...'}</AppText>
				) : (
					<AppText type="label" color="dark">
						{selected}
					</AppText>
				)}
			</Touchable>
		</InputBase>
	);
};

const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
	listContent: {
		justifyContent: 'center',
		flexGrow: 1,
	},
	center: { textAlign: 'center' },
});
const Touchable = styled.TouchableOpacity`
	flex: 1;
	padding: 15px;
	align-items: flex-start;
	justify-content: center;
`;
const PickerItem = styled.TouchableOpacity`
	padding: 20px 15px;
	align-items: center;
`;
const Separator = styled.View`
	background: ${({ theme }) => theme.colors.gray[2]};
	height: 1px;
	margin-horizontal: 50px;
`;
const ListContainer = styled.SafeAreaView`
	flex-grow: 1;
	max-height: ${height}px;
`;
export default Picker;
