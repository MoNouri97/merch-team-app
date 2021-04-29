import React from 'react';
import useGetCompetitors from '~/api/competitorAPI';
import Picker from '~/components/Forms/Picker';

interface CategoriesPickerProps {
	name?: string;
	label?: string;
}

const CategoriesPicker: React.FC<CategoriesPickerProps> = ({
	name = 'competitor',
	label = 'conçurent',
}) => {
	const { data } = useGetCompetitors();
	return (
		<Picker
			{...{
				name,
				label,
			}}
			data={data}
		/>
	);
};
export default React.memo(CategoriesPicker);
