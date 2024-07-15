import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from '../components/Header'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="body-wrap">
            <h1>homepage</h1>
        </div>
    )
}
