import React from 'react';
import useGetCategories from '~/api/categoryAPI';
import Picker from '~/components/Forms/Picker';
import createPickerData from '~/Helpers/createPickerData';
import { Category } from '~/types/models/Category';

interface CategoriesPickerProps {
	name?: string;
	label?: string;
}

const CategoriesPicker: React.FC<CategoriesPickerProps> = ({
	name = 'category',
	label = 'catégorie',
}) => {
	const { data, refetch } = useGetCategories();
	return (
		<Picker
			{...{
				name,
				label,
			}}
			onOpen={refetch}
			data={createPickerData<Category>(data, { name: 'nom' })}
		/>
	);
};
export default React.memo(CategoriesPicker);
