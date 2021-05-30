import { useField } from 'formik';
import { useGetCompetitor } from '~/api/competitorAPI';

export const useCompetitorName = (name: string) => {
	const COMPETITOR_PATH = `${name}.competitor`;
	const [{ value }] = useField(COMPETITOR_PATH);
	const { data } = useGetCompetitor(value);
	const COMPETITOR = data?.name ? data?.name : 'conçurent';

	return { COMPETITOR, COMPETITOR_PATH };
};
