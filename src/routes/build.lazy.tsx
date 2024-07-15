import { createLazyFileRoute } from '@tanstack/react-router'
import {Builder} from '../components/Builder'
export const Route = createLazyFileRoute('/build')({
  component: () => {
    return (
      <div className="body-wrap container">
        <h3>Welcome to the Build Page!</h3>
        <Builder />
      </div>
    )
  }
})