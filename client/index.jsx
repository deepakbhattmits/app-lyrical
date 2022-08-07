import ReactDOM from 'react-dom'
// import ApolloClient from 'apollo-client'
// import { ApolloProvider } from 'react-apollo'
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client'
import Router from './router/Router';

import './style/style.css';


const client = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  uri:"https://api.spacex.land/graphql",
  cache: new InMemoryCache(),
  // dataIdFromObject:o=> o?.id
})
const rootElement=document.querySelector('#root');
const Root = () =>(
    <ApolloProvider client={client}>
      <Router/>
    </ApolloProvider>
  );

ReactDOM.render(<Root />, rootElement)
