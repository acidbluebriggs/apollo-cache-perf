import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import {clFragmentMatcher} from './cl-apollo-fragment-matcher'

const TYPE_KEY_SEPARATOR = '_'

function dataIdFromObject(result) {
  const key = _getKeyFrom(result)
  if (result.__typename && typeof key !== 'undefined') {
    return assembleDataId(result.__typename, key)
  }

  // Make sure to return null if this object doesn't have an ID
  return null
}

/**
 * Extract a key from an object
 * @param {Object} obj The graphql object
 * @return {*|undefined} key The key of the object
 * @private
 */
function _getKeyFrom(obj) {
  // As this expands, consider extracting a better interface for getting ids by typename
  return (
    obj &&
    ((
      // eslint-disable-next-line
      obj.__typename === 'PersonnelRole' && obj.id + '##' + obj.role.code) ||
      // eslint-disable-next-line
      obj.__typename === 'Workspace' && 'WAC' + obj.bed.exchangeName ||
      obj.encounterId ||
      obj.id ||
      obj.exchangeName ||
      ((obj.__typename === 'Workspace' && (obj.visit && obj.visit.id)) ||
        (obj.bed && obj.bed.length && obj.bed[0].exchangeName)) ||
      (obj.__typename === 'Config' && obj.name) ||
      undefined)
  )
}

/**
 * Combine a typename and a key to produce a Data Id for Apollo
 * @param typename The typename of the entity
 * @param key The string or number key of the entity
 * @returns {string} DataId for the Apollo cache
 */
export function assembleDataId(typename, key) {
  return typename
    + TYPE_KEY_SEPARATOR + key
}
const cache = new InMemoryCache({
  dataIdFromObject: dataIdFromObject,
  addTypename: true,
  fragmentMatcher: clFragmentMatcher
})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: '/graphql',
      credentials: 'same-origin',
      useGETForQueries: true //for demo as the json-server overwrites on post
    })
  ]),
  cache
});

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
)

ReactDOM.render(ApolloApp(App), document.getElementById('root'));
registerServiceWorker();
