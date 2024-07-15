import { Link } from "@tanstack/react-router"
import { UserCard } from "./UserCard"
export const Header = () => {
    return (
        <header className="p-2">
            <h1 className="title">Build A Crump!</h1>
            <nav>
                <Link className="btn primary-btn bounce" to="/">Home</Link>
                <Link className="btn primary-btn bounce" to="/build">Build</Link>
                <Link className="btn primary-btn bounce" to="/auth">About</Link>
            </nav>
            <UserCard />
        </header>
    )
}