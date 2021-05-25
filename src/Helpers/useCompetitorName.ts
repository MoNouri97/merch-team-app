import { useFormikContext } from 'formik';

export const useCompetitorName = (name: string) => {
	const { values }: { values: any } = useFormikContext();
	const COMPETITOR_PATH = `${name}.competitor`;
	const COMPETITOR = values[COMPETITOR_PATH]
		? values[COMPETITOR_PATH]
		: 'conçurent';

	return { COMPETITOR, COMPETITOR_PATH };
};
