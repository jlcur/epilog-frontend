import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryKey } from "@/config/query-key";
import { authClient } from "@/lib/auth-client";

const getSession = async () => {
	const { data } = await authClient.getSession();
	return data;
};

export const getSessionQueryOptions = () => {
	return queryOptions({
		queryKey: queryKey.session,
		queryFn: getSession,
	});
};

export const useSession = () => {
	return useQuery(getSessionQueryOptions());
};
