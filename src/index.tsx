import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider, store } from './settings';
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const client = new QueryClient()
root.render(
  <Router>
    <ContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </Provider>
    </ContextProvider>
  </Router>

);