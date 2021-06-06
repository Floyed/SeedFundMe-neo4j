import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import DiagramChart from './DiagramChart'

const GET_DATA_QUERY = gql`
  query getCompleteInfo {
    businesses {
      name
      businessId
    }
    categories {
      categoryId
      name
    }
    investors {
      investorId
      name
    }
    getInvestorLinks {
      investorId
      categoryId
    }
    getBusinessLinks {
      businessId
      categoryId
    }
  }
`

const BusinessNode = (props) => {
  const { content } = props
  return (
    <div style={{ background: '#c0f28a', borderRadius: '10px' }}>
      <div style={{ padding: '10px', color: 'white' }}>{content}</div>
    </div>
  )
}

const InvestorNode = (props) => {
  const { content } = props
  return (
    <div style={{ background: '#717EC3', borderRadius: '10px' }}>
      <div style={{ padding: '10px', color: 'white' }}>{content}</div>
    </div>
  )
}

function getFormattedData(data) {
  let nodes = []

  for (var i = 0; i < data.businesses.length; i++) {
    var business_node = {}

    business_node.id = data.businesses[i].businessId
    business_node.content = data.businesses[i].name
    business_node.coordinates = [500, 120]
    business_node.render = BusinessNode

    nodes.push(business_node)
  }

  for (i = 0; i < data.categories.length; i++) {
    var category_node = {}

    category_node.id = data.categories[i].categoryId
    category_node.content = data.categories[i].name
    category_node.coordinates = [500, 120]

    nodes.push(category_node)
  }

  for (i = 0; i < data.investors.length; i++) {
    var investor_node = {}

    investor_node.id = data.investors[i].investorId
    investor_node.content = data.investors[i].name
    investor_node.coordinates = [500, 120]
    business_node.render = InvestorNode

    nodes.push(investor_node)
  }

  return nodes
}

export default function InvestorsChart() {
  const { loading, error, data } = useQuery(GET_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  console.log(data)

  let schema = {}
  schema.nodes = getFormattedData(data)

  return (
    <React.Fragment>
      <Title>Mapping investors to Small businesses</Title>
      <DiagramChart input_schema={schema} />
    </React.Fragment>
  )
}
