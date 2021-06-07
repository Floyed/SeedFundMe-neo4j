import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel,
} from '@material-ui/core'

import Title from './Title'

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
  },
})

const GET_SUGGESTIONS = gql`
  query getSuggestions($investorId: ID!) {
    getSuggestions(investorId: $investorId) {
      businessId
      name
    }
  }
`

function BusinessList(props) {
  const { classes } = props

  const { investorId } = props

  const { loading, data, error } = useQuery(GET_SUGGESTIONS, {
    variables: {
      investorId: investorId,
    },
  })
  console.log(investorId)
  console.log(data)

  return (
    <Paper className={classes.root}>
      <Title>List of businesses: </Title>

      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell key="name">
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel>Name</TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell key="location">City</TableCell>
              <TableCell key="location">State</TableCell>
              <TableCell key="sales">Sales</TableCell>
              <TableCell key="categories">Categories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getSuggestions.map((n) => {
              return (
                <TableRow key={n.businessId}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.city}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.state}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.sales}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.categories}
                  </TableCell>
                  {/* <TableCell>
                    {n.avgStars ? n.avgStars.toFixed(2) : '-'}
                  </TableCell>
                  <TableCell>{n.numReviews}</TableCell> */}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}

export default withStyles(styles)(BusinessList)
