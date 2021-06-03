import React, { useState } from 'react';
import useGetProducts, { getProductsParams } from '~/api/productAPI';
import CheckList from '~/components/Forms/CheckList';
import { InputInner } from '~/components/Forms/Input';
import InputBase from '~/components/Forms/InputBase';
import createPickerData from '~/Helpers/createPickerData';

type ProductsCheckListProps = {
	name?: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
} & (
	| { withParams?: never; params?: getProductsParams }
	| { withParams?: true; params: getProductsParams }
);

const ProductsCheckList: React.FC<ProductsCheckListProps> = ({
	name = 'products',
	label = 'Produits',
	placeholder = 'Choisir une GMS ...',
	params,
	withParams,
	disabled = false,
}) => {
	const enabled = withParams ? !!params?.gms : !disabled;
	const { data, isFetching } = useGetProducts(params, {
		enabled,
	});

	const [search, setSearch] = useState('');

	const listData = React.useMemo(() => {
		if (isFetching) return [];
		if (!enabled) return [];
		if (search.length) {
			return createPickerData(data, { name: 'designation' }).filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}
		return createPickerData(data, { name: 'designation' });
	}, [isFetching, data, search, enabled]);

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
