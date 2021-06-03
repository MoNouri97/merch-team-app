import React from 'react';
import { useGetAllCompetitors } from '~/api/competitorAPI';
import Picker from '~/components/Forms/Picker';

interface CategoriesPickerProps {
	name?: string;
	label?: string;
}

const CategoriesPicker: React.FC<CategoriesPickerProps> = ({
	name = 'competitor',
	label = 'conçurent',
}) => {
	const { data, refetch } = useGetAllCompetitors();
	return (
		<Picker
			{...{
				name,
				label,
			}}
			onOpen={refetch}
			data={data}
		/>
	);
};
export default React.memo(CategoriesPicker);
