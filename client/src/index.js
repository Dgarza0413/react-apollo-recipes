import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
import Signup from './components/Auth/Signup'
import Signin from './components/Auth/Signin'
import withSession from './components/withSession'
import Navbar from './components/Navbar';
import Search from './components/Recipe/Search';

import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './index.css';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql' || '',
  fetchOptions: {
    credentials: 'include'
  },
  cache,
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("NetWork Error", networkError)

      if (networkError.statusCode === 401) {
        localStorage.removeItem('token')
      }
    }
  },
  // onSuccess: ({ networkSuccess }) => {
  //   if (networkSuccess) {
  //     console.log("NetWork Success", networkSuccess)
  //   }
  // }
})

const Root = (props, { refetch }) => {
  console.log(props)
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/search" component={Search} />
          <Route path="/signin" render={() => <Signin {...props} refetch={refetch} />} />
          <Route path="/signup" render={() => <Signup {...props} refetch={refetch} />} />
          <Redirect to="/" />
        </Switch>
      </>
    </Router>
  )
}

const RootWithSession = withSession(Root)

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <Root /> */}
      <RootWithSession />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
