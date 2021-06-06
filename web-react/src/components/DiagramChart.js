import React from 'react'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'

const InvestorNode = (props) => {
  const { content } = props
  return (
    <div style={{ background: '#717EC3', borderRadius: '10px' }}>
      <div style={{ padding: '10px', color: 'white' }}>{content}</div>
    </div>
  )
}

const BusinessNode = (props) => {
  const { content } = props
  return (
    <div style={{ background: '#c0f28a', borderRadius: '10px' }}>
      <div style={{ padding: '10px', color: 'white' }}>{content}</div>
    </div>
  )
}

// the diagram model
const initialSchema = createSchema({
  nodes: [
    {
      id: 'investor-1',
      content: 'Investor 1',
      coordinates: [100, 60],
      render: InvestorNode,
    },
    {
      id: 'investor-2',
      content: 'Investor 2',
      coordinates: [100, 120],
      render: InvestorNode,
    },
    {
      id: 'investor-3',
      content: 'Investor 3',
      coordinates: [100, 180],
      render: InvestorNode,
    },
    { id: 'category-1', content: 'Beauty', coordinates: [300, 60] },
    { id: 'category-2', content: 'Clothing', coordinates: [300, 120] },
    { id: 'category-3', content: 'Health Care', coordinates: [300, 180] },
    { id: 'category-4', content: 'Women-owned', coordinates: [300, 240] },
    { id: 'category-5', content: 'Black-owned', coordinates: [300, 3000] },
    {
      id: 'business-1',
      content: 'DEMESTIK',
      coordinates: [500, 60],
      render: BusinessNode,
    },
    {
      id: 'business-2',
      content: 'Island Tribe',
      coordinates: [500, 120],
      render: BusinessNode,
    },
    {
      id: 'business-3',
      content: 'Saint Ola',
      coordinates: [500, 180],
      render: BusinessNode,
    },
  ],
  links: [
    {
      input: 'investor-1',
      output: 'category-2',
      readonly: true,
      label: BusinessNode,
    },
    { input: 'investor-2', output: 'category-1', readonly: true },
    { input: 'investor-2', output: 'category-2', readonly: true },
    { input: 'investor-3', output: 'category-3', readonly: true },
    { input: 'investor-3', output: 'category-4', readonly: true },
    { input: 'business-1', output: 'category-1', readonly: true },
    { input: 'business-2', output: 'category-3', readonly: true },
    { input: 'business-2', output: 'category-4', readonly: true },
    { input: 'business-3', output: 'category-1', readonly: true },
  ],
})

export default function DiagramChart() {
  const [schema, { onChange }] = useSchema(initialSchema)

  return <Diagram schema={schema} onChange={onChange} />
}
