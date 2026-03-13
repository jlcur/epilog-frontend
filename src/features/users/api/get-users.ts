import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryKey } from "@/config/query-key";
import { authClient } from "@/lib/auth-client";
import type { QueryConfig } from "@/lib/react-query";

export type ListUsersQuery = Parameters<
	typeof authClient.admin.listUsers
>[0]["query"];

export const getUsers = async (query: ListUsersQuery) => {
	const { data, error } = await authClient.admin.listUsers({ query });
	if (error) throw error;
	return data;
};

export const getUsersQueryOptions = (query: ListUsersQuery) => {
	return queryOptions({
		queryKey: queryKey.users.list(query),
		queryFn: () => getUsers(query),
	});
};

type UseUsersOptions = {
	query: ListUsersQuery;
	queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({ query, queryConfig }: UseUsersOptions) => {
	return useQuery({
		...getUsersQueryOptions(query),
		...queryConfig,
	});
};
