import React, { useState } from 'react';
import useGetProducts, { getProductsParams } from '~/api/productAPI';
import CheckList from '~/components/Forms/CheckList';
import { InputInner } from '~/components/Forms/Input';
import InputBase from '~/components/Forms/InputBase';
import createPickerData from '~/Helpers/createPickerData';

interface ProductsCheckListProps {
	name?: string;
	label?: string;
	placeholder?: string;
	params?: getProductsParams;
}

const ProductsCheckList: React.FC<ProductsCheckListProps> = ({
	name = 'products',
	label = 'Produits',
	placeholder = 'Choisir une GMS ...',
	params = { gms: '', category: '' },
}) => {
	const { data, isFetching } = useGetProducts(params);
	const [search, setSearch] = useState('');

	const listData = React.useMemo(
		() =>
			!isFetching
				? createPickerData(data, { name: 'designation' }).filter((item) =>
						item.name.toLowerCase().includes(search.toLowerCase())
				  )
				: [],
		[isFetching, data, search]
	);
	return (
		<>
			<CheckList
				name={name}
				label={label}
				placeholder={placeholder}
				data={listData}
			>
				<InputBase label="" name="" icon="search" hideError>
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
export default ProductsCheckList;
