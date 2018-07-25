import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'

const interfacesAndUnions = [
  {
    kind: 'INTERFACE',
    name: 'Auditable',
    possibleTypes: [
      {
        name: 'BarrierTemplate'
      },
      {
        name: 'FavoriteActions'
      },
      {
        name: 'FavoriteBarrier'
      },
      {
        name: 'FavoriteNotes'
      },
      {
        name: 'Plan'
      },
      {
        name: 'PlanAction'
      },
      {
        name: 'PlanNote'
      },
      {
        name: 'MilestoneAction'
      },
      {
        name: 'Barrier'
      },
      {
        name: 'Escalation'
      },
      {
        name: 'BarrierNote'
      }
    ]
  }
]

export const clFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: interfacesAndUnions
    }
  }
})
