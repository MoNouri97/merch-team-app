import React from 'react';
import useGetProducts, { getProductsParams } from '~/api/productAPI';
import Picker from '~/components/Forms/Picker';
import createPickerData from '~/Helpers/createPickerData';

interface ProductsPickerProps {
	name?: string;
	label?: string;
	params?: getProductsParams;
}

const ProductsPicker: React.FC<ProductsPickerProps> = ({
	name = 'product',
	label = 'Article',
	params = { category: '', gms: '' },
}) => {
	const { data } = useGetProducts(params);
	return (
		<Picker
			{...{ name, label }}
			data={createPickerData(data, { name: 'designation' })!}
		/>
	);
};
export default ProductsPicker;
