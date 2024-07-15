import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY_ANON
);

export const fetchUser = async () => {
	const session = supabase.auth;	
	const getSession = await session.getSession()
	if (session && getSession && getSession.data.session) {
		return getSession.data.session.user.user_metadata
	} else {
		return null;
	}
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
	if (error) throw error;
};