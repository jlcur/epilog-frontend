import Axios from "axios";
import { env } from "@/config/env";

export const api = Axios.create({
	baseURL: env.API_URL,
});

/**
 * Intercept the response so that instead of doing:
 * const { data } = await api.get(endpoints.comments.all);
 *
 * We can do this:
 * const data = await api.get(endpoints.comments.all);
 */
api.interceptors.response.use((response) => {
	return response.data;
});
