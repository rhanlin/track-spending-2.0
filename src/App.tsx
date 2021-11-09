import 'twin.macro'
import '@view/styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { ReactQueryDevtools } from 'react-query/devtools'

import { ROOT_PATH, ROUTE_CONFIG } from '@view/constants/router'

import REACT_CONSOLE from '@view/utils/versionLog'

import { version } from '../package.json'

REACT_CONSOLE('version', version)

// Create a client
const queryClient = new QueryClient()

const SwitchPage = () => {
  return (
    <div tw="flex flex-col min-h-screen">
      <div tw="flex-1">
        <Switch>
          {ROUTE_CONFIG.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route path={ROOT_PATH} component={SwitchPage} />
          <Redirect to={'/'} />
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
