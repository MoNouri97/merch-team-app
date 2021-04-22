import { AxiosResponse } from 'axios';

export type QueryFn<Return = null, Params = null> = ({
	queryKey,
}: {
	queryKey: (string | Params)[];
}) => Promise<AxiosResponse<Return>>;
