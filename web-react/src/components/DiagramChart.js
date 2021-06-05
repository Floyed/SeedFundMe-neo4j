import React from 'react'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'

// the diagram model
const initialSchema = createSchema({
  nodes: [
    { id: 'node-1', content: 'Node 1', coordinates: [250, 60] },
    { id: 'node-2', content: 'Node 2', coordinates: [100, 200] },
    { id: 'node-3', content: 'Node 3', coordinates: [250, 220] },
    { id: 'node-4', content: 'Node 4', coordinates: [400, 200] },
  ],
  links: [
    { input: 'node-1', output: 'node-2' },
    { input: 'node-1', output: 'node-3' },
    { input: 'node-1', output: 'node-4' },
  ],
})

export default function DiagramChart() {
  const [schema, { onChange }] = useSchema(initialSchema)

  return <Diagram schema={schema} onChange={onChange} />
}
