import { Link } from "@tanstack/react-router"
import { UserCard } from "./UserCard"
import { Authenicate } from "./Authenicate"
import { useUserQuery } from "../authentication";
import { useState } from "react";
export const Header = () => {
    const [showAuth, setShowAuth] = useState(false);
    const { data: user, error, isLoading } = useUserQuery();
    return (
        <header className="">
            <h1 className="title">Build A Crump!</h1>
            <nav>
                <Link className="btn primary-btn bounce" to="/">Build</Link>
                {
                    user ? (
                        <Link className="btn primary-btn bounce" to="/auth">Account</Link>
                    ) : (
                        <button onClick={() => setShowAuth(true)} className="btn twitch-btn" >Login</button>
                    )
                }
            </nav>
            <div className="header-login">
                {
                    user ? (
                        <div className="user-image">
                            <img src={user.avatar_url} alt="user" />
                        </div>
                    ) : null
                }
            </div>
            {
                showAuth ? (
                    <div className="auth-overlay">
                        <div className="overlay-close">
                            <button onClick={() => setShowAuth(false)} className="btn twitch-btn">Close</button>
                        </div>
                        <Authenicate />
                    </div>
                ) : null
            }
        </header>
    )
}