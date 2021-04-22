export type QueryFn<Return = null, Params = null> = ({
	queryKey,
}: {
	queryKey: (string | Params)[];
}) => Promise<Return>;
