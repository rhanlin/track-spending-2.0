import Login from '@view/pages/login'
import Overview from '@view/pages/overview'

export const ROOT_PATH = '/'

export const ROUTE_CONFIG = [
  { exact: true, path: `${ROOT_PATH}`, component: Login },
  { exact: true, path: `${ROOT_PATH}overview`, component: Overview }
]
