import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route } from 'wouter';
import gql from 'graphql-tag';
import {
  useQuery,
  createClient,
  Provider,
  cacheExchange,
  dedupExchange,
  debugExchange,
  fetchExchange,
} from 'urql';

const client = createClient({
  url: 'https://www.graphqlhub.com/graphql',
  exchanges: [dedupExchange, cacheExchange, debugExchange, fetchExchange],
});

const QUERY = gql`
  query hn {
    hn {
      newStories(limit: 1) {
        title
      }
    }
  }
`;
function App() {
  return (
    <Provider value={client}>
      <div>
        <Link href="/test-1">
          <a>Test1</a>
        </Link>
        &nbsp; | &nbsp;
        <Link href="/test-2">
          <a>Test2</a>
        </Link>
      </div>
      <div>
        <Route path="/test-1" component={Test1} />
        <Route path="/test-2" component={Test2} />
      </div>
    </Provider>
  );
}

function Test1() {
  const [{ data, fetching }] = useQuery({
    query: QUERY,
    requestPolicy: 'cache-and-network',
  });
  return (
    <>
      <h1>Test1</h1>
      {fetching ? <p>loading...</p> : <p>{data.hn.newStories[0].title}</p>}
    </>
  );
}

function Test2() {
  const [{ data, fetching }] = useQuery({
    query: QUERY,
    requestPolicy: 'cache-and-network',
  });
  return (
    <>
      <h1>Test2</h1>
      {fetching ? <p>loading...</p> : <p>{data.hn.newStories[0].title}</p>}
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
