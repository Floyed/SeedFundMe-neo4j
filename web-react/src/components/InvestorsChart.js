import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import DiagramChart from './DiagramChart'

const GET_DATA_QUERY = gql`
  {
    ratingsCount {
      stars
      count
    }
  }
`

export default function InvestorsChart() {
  const { loading, error } = useQuery(GET_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Ratings Distribution</Title>
      <DiagramChart />
    </React.Fragment>
  )
}
