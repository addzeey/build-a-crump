import { createLazyFileRoute } from '@tanstack/react-router'
import { Authenicate } from '../../components/Authenicate'

export const Route = createLazyFileRoute('/auth/')({
  component: Authenicate
})