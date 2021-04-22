import React from 'react';
import useGetProducts, { getProductsParams } from '~/api/productAPI';
import CheckList from '~/components/Forms/CheckList';
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
	placeholder = 'Choisir une GMS et une Catégorie ...',
	params = { gms: '', category: '' },
}) => {
	const { data } = useGetProducts(params, {
		enabled: !!params.gms && !!params.category,
	});
	return (
		<CheckList
			name={name}
			label={label}
			placeholder={placeholder}
			data={createPickerData(data, { name: 'designation' })}
		/>
	);
};
export default ProductsCheckList;
