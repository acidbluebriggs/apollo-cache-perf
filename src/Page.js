import React, {Fragment} from 'react'
import {Query} from 'react-apollo'
import CursorPlansQuery from './query-plans.graphql'

export const LoadingIndicator = (
  {
    status,
    config = {
      1: 'Loading',
      2: 'Setting variables',
      3: 'Fetching More',
      4: 'Re-fetching',
      6: 'Poll',
      7: 'Ready',
      8: 'Error'
    }
  }) => (
  <div>
    {
      config[status]
    }
  </div>
)

export const Page = ({count = 10}) => (
  <Query
    query={CursorPlansQuery}
    variables={{count}}
    fetchPolicy={'cache-and-network'}
    // fetchPolicy={'no-cache'}
  >
    {({data: {repository}, loading, fetchMore, networkStatus}) => {
      //ugly code, demo stuff!
      const edges = (repository && repository.workArea && repository.workArea.edges) || []

      return (
        <Fragment>
          <LoadingIndicator status={networkStatus}/>
          <PageTable
            status={networkStatus}
            items={edges.map(edge => edge.node.bed)}
          />
        </Fragment>)
    }}
  </Query>
)


const PageTable = ({items = []}) => {
  return (
    <div>
      <div>
        {items.map((item) =><div key={item.exchangeName}>{item.exchangeName}, {item.name}, {item.status}</div>)}
      </div>
    </div>
  )
}
