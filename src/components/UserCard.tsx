import { useQuery } from "@tanstack/react-query";
import { useUserQuery } from "../authentication";
import { useEffect, useState } from "react";
import { UserMetadata } from "@supabase/supabase-js";

export const UserCard = (props :UserMetadata) => {
    const [user, setUser] = useState<UserMetadata | null>(null);
    const { data, error, isLoading } = useUserQuery();
    useEffect(() => {
        if(data) {
          setUser(data);
        }
    }, [data]);
  return (

  );
};