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
    investorLinks {
      investorId
      categoryId
    }
    businessLinks {
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

function getFormattedNodes(data) {
  let nodes = []

  let x = 100,
    y = 60

  for (let i = 0; i < data.investors.length; i++) {
    var investor_node = {}

    investor_node.id = data.investors[i].investorId
    investor_node.content = data.investors[i].name
    investor_node.coordinates = [x, y]
    investor_node.render = InvestorNode

    y = y + 60

    nodes.push(investor_node)
  }

  ;(x = 300), (y = 60)

  for (let i = 0; i < data.categories.length; i++) {
    var category_node = {}

    category_node.id = data.categories[i].categoryId
    category_node.content = data.categories[i].name
    category_node.coordinates = [x, y]

    y = y + 60

    nodes.push(category_node)
  }

  ;(x = 500), (y = 60)

  for (let i = 0; i < data.businesses.length; i++) {
    var business_node = {}

    business_node.id = data.businesses[i].businessId
    business_node.content = data.businesses[i].name
    business_node.coordinates = [x, y]
    business_node.render = BusinessNode

    y = y + 60
    nodes.push(business_node)
  }

  return nodes
}

function getFormattedLinks(data) {
  let links = []

  for (let i = 0; i < data.businessLinks.length; i++) {
    let link = {}

    link.input = data.businessLinks[i].businessId
    link.output = data.businessLinks[i].categoryId
    link.readonly = true

    links.push(link)
  }

  for (let i = 0; i < data.investorLinks.length; i++) {
    let link = {}

    link.input = data.investorLinks[i].investorId
    link.output = data.investorLinks[i].categoryId
    link.readonly = true

    links.push(link)
  }

  return links
}

export default function InvestorsChart() {
  const { loading, error, data } = useQuery(GET_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  console.log(data)

  let schema = {}
  schema.nodes = getFormattedNodes(data)
  schema.links = getFormattedLinks(data)

  return (
    <React.Fragment>
      <Title>Mapping investors to Small businesses</Title>
      <DiagramChart input_schema={schema} />
    </React.Fragment>
  )
}
