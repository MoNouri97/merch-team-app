import React from 'react';
import { CategoriesPicker, ImageInput } from '~/components/Forms';
import CompetitorsPicker from '~/components/Forms/helpers/CompetitorsPicker';
import { yup } from '~/config/yupFrLocal';
import { useCompetitorName } from '~/Helpers/useCompetitorName';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

export const schemaCompetitorEvent = yup.object({
	category: yup.string().required(),
	competitor: yup.string().required(),
	images: yup.array().required().min(1),
});
export const initialCompetitorEvent = {
	category: '',
	competitor: '',
	images: [],
};
const CompetitorEvent: React.FC<ReportEventFrom> = ({ name }) => {
	const { COMPETITOR, COMPETITOR_PATH } = useCompetitorName(name);
	return (
		<EventContainer title={`Événement ${COMPETITOR}`}>
			<CategoriesPicker name={`${name}.category`} />
			<CompetitorsPicker name={COMPETITOR_PATH} />
			<ImageInput name={`${name}.images`} multiple />
		</EventContainer>
	);
};
export default CompetitorEvent;
