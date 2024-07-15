import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "../assets/_login.scss";
import { fetchUser, signInWithTwitch } from "../authentication";
import { useEffect } from "react";
import { UserMetadata } from "@supabase/supabase-js";

export const Authenicate = () => {
    const { mutate: useSignin } = useMutation<UserMetadata>({
        mutationFn: () => {
            return signInWithTwitch();
        },
    });
    const { data: user, error, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            return fetchUser();
        },
    })
    useEffect(() => {
        if(user) {
            console.log(user);
        }
    }, [user]);
    return (
        <div className="login-wrap">
            <h3>Login with Twitch</h3>
            <p className="info">
                Login is not nessessary to build a crump , but it is requred to save your crump to update it later.
            </p>
            <button onClick={() => useSignin()} className="btn twitch-btn bounce">Login with Twitch</button>
            {
                user && (
                    <div>
                        <img src={user.avatar_url} alt={user.nickname} className="auth-avatar" />
                        <p>Logged in as {user.nickname}</p>
                        <p></p>
                    </div>
                )
            }
        </div>
    )
};