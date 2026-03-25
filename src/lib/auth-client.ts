import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authBaseUrl = import.meta.env.VITE_APP_API_URL
	? `${import.meta.env.VITE_APP_API_URL}/auth`
	: "http://localhost:3001/api/v1/auth";

export const authClient = createAuthClient({
	baseURL: authBaseUrl,
	plugins: [adminClient()],
});
