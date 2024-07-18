import { useQuery } from "@tanstack/react-query";
import { useUserQuery } from "../authentication";
import { useEffect, useState } from "react";
import { UserMetadata } from "@supabase/supabase-js";

export const UserCard = () => {
    const [user, setUser] = useState<UserMetadata | null>(null);
    const { data, error, isLoading } = useUserQuery();
    useEffect(() => {
        if(data) {
          console.log(data);
          
          setUser(data);
        }
    }, [data]);
  return (
    <div className="header-login">
      {
        user ? (
          <div className="user-image">
          <img src={user.avatar_url} alt="user" />
          </div>
        ) : (
          <div className="login">
          <a className="btn twitch-btn" href="http://">Login with Twitch</a>
        </div>
        )
      }  
    </div>
  );
};