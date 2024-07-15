import { createFileRoute } from '@tanstack/react-router'
import { Authenicate } from '../../components/Authenicate'
type AuthParams = {
  code: string
  state: string
}
export const Route = createFileRoute('/auth/callback')({
  validateSearch: (params: any): params is AuthParams => {
    return typeof params.code === 'string' && typeof params.state === 'string'
  },
  loader: async () => {
  },
  component: AuthCallback
})

function AuthCallback () {
  return (
    <div>
    <Authenicate />
    </div>
  )
}