import { createLazyFileRoute } from '@tanstack/react-router'
import {Builder} from '../components/Builder'
export const Route = createLazyFileRoute('/')({
  component: () => {
    return (
      <div className="body-wrap container">
        <Builder />
      </div>
    )
  }
})