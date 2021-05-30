import { useField } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import useGetProducts, { getProductsParams } from '~/api/productAPI';
import Picker from '~/components/Forms/Picker';
import createPickerData from '~/Helpers/createPickerData';

interface ProductsPickerProps {
	name?: string;
	label?: string;
}

const ProductsPicker: React.FC<ProductsPickerProps> = ({
	name = 'product',
	label = 'Article',
}) => {
	const [params, setParams] = useState<getProductsParams>();
	const categoryName = useMemo(() => name.replace('product', 'category'), [
		name,
	]);
	const [{ value }] = useField(categoryName);

	useEffect(() => {
		setParams({ category: value });
	}, [value]);
	const { data, refetch } = useGetProducts(params);

	return (
		<Picker
			{...{ name, label }}
			onOpen={refetch}
			data={createPickerData(data, { name: 'designation' })!}
		/>
	);
};
export default ProductsPicker;
