import { useField } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import useGetProducts, { getProductsParams } from '~/api/productAPI';
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
	const gmsName = useMemo(() => name.replace('products', 'GMS'), [name]);
	const [, , { setValue: setProducts }] = useField(name);
	const [{ value: gmsId }] = useField(gmsName);
	const [params, setParams] = useState<getProductsParams>();
	const { data, isFetching } = useGetProducts();

	const { refetch } = useGetProducts(params, {
		enabled: !!params,
		cacheTime: Infinity,
		onSuccess: (res: Product[]) => {
			setProducts(res?.map((product) => product.id.toString()));
		},
	});

	useEffect(() => {
		if (!gmsId) return;
		setParams({ gms: gmsId });
		refetch();
	}, [setParams, refetch, gmsId]);

	const [search, setSearch] = useState('');

	const listData = React.useMemo(() => {
		if (!gmsId) return [];
		if (isFetching) return [];
		return createPickerData(data, { name: 'designation' }).filter((item) =>
			item.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [isFetching, data, search, gmsId]);

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
