import React from 'react'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'

export default function DiagramChart(props) {
  const { input_schema } = props
  console.log(input_schema)

  const parsed_schema = createSchema(input_schema)

  const [schema, { onChange }] = useSchema(parsed_schema)

  return <Diagram schema={schema} onChange={onChange} />
}
