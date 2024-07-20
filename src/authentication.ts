import { createClient, UserMetadata } from "@supabase/supabase-js";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { SelectData } from "./types";
import { Navigate } from "@tanstack/react-router";
export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY_ANON
);

const fetchUser = async () => {
	console.log("fetching user");
	const session = supabase.auth;	
	const getSession = await session.getSession()
	if (session && getSession && getSession.data.session) {
		return getSession.data.session.user.user_metadata
	} else {
		return null;
	}
};
export function useUserQuery() {
    return useQuery({
        queryKey: ['user'],
        queryFn: fetchUser, // Directly pass the fetch function
		staleTime: 1000 * 60 * 30
    });
}
export const useSaveCrump = async (crumpData: SelectData) => {
	const { data, error } = await supabase.auth.updateUser({
		data: { crump: JSON.stringify(crumpData) },
	});
	if (error) throw error;
	console.log(data);
};

export const signInWithTwitch = async () => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "twitch",
		options: {
			scopes: "user:read:email",
		},
	});
	if (error) throw error;
    console.log(data);
    
    return data;
};
export const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	window.location.reload();
	if (error) throw error;
};