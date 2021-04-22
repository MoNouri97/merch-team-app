import { QueryFunction, UseQueryOptions } from 'react-query';

export type QueryOptions<Return = any, Params = any> = UseQueryOptions<
	Return,
	any,
	any,
	[string, Params]
>;

export type QueryFn<Return = null, Params = null> = QueryFunction<
	Return,
	[string, Params]
>;
// export type QueryFn<Return = null, Params = null> = (
// 	key: QueryFunctionContext<[string, Params]>
// ) => Promise<Return>;
// export type  QueryFun<Return = null, Params = null> = (key: {
// 	queryKey: (string | Params)[];
// }) => Promise<Return>;
