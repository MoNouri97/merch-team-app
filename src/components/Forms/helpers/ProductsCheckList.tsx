import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import useGetProducts from '~/api/productAPI';
import CheckList from '~/components/Forms/CheckList';
import { InputInner } from '~/components/Forms/Input';
import InputBase from '~/components/Forms/InputBase';
import createPickerData from '~/Helpers/createPickerData';
import { Product } from '~/types/models/Product';

interface ProductsCheckListProps {
	name?: string;
	label?: string;
	placeholder?: string;
}

// TODO test-this
const ProductsCheckList: React.FC<ProductsCheckListProps> = ({
	name = 'products',
	label = 'Produits',
	placeholder = 'Choisir une GMS ...',
}) => {
	const [, { touched }, { setValue: setProducts, setTouched }] = useField(name);
	const [{ value: GMS }, , { setValue: setGMS }] = useField('GMS');
	const [prevGMS, setPrevGMS] = useState(GMS);

	const { data, isFetching } = useGetProducts();

	useGetProducts(
		{ gms: prevGMS },
		{
			enabled: !!prevGMS,
			onSuccess: (res: Product[]) => {
				setProducts(res?.map((product) => product.id.toString()));
			},
		}
	);
	useEffect(() => {
		if (GMS === prevGMS) return;
		if (!touched) {
			setPrevGMS(GMS);
			return;
		}
		Alert.alert('Confirmation', 'Vos modifications seront perdues', [
			{
				text: 'Oui',
				onPress: () => {
					setTouched(false);
					setPrevGMS(GMS);
				},
			},
			{
				text: 'Non',
				onPress: () => {
					setGMS(prevGMS);
				},
			},
		]);
	}, [GMS]);

	const [search, setSearch] = useState('');

	const listData = React.useMemo(() => {
		if (!prevGMS) return [];
		if (isFetching) return [];
		if (search.length) {
			return createPickerData(data, { name: 'designation' }).filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}
		return createPickerData(data, { name: 'designation' });
	}, [isFetching, data, search, prevGMS]);

	return (
		<>
			<CheckList
				name={name}
				label={label}
				placeholder={placeholder}
				data={listData}
			>
				<InputBase
					label=""
					name=""
					icon="search"
					hideError
					onIconPress={() => setSearch('')}
				>
					<InputInner
						placeholder="rechercher"
						value={search}
						onChange={(e) => {
							setSearch(e.nativeEvent.text);
						}}
					/>
				</InputBase>
			</CheckList>
		</>
	);
};
export default React.memo(ProductsCheckList);
