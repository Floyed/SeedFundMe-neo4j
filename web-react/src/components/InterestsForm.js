import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import { TableCell, TableRow, Paper } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import Title from './Title'
import InterestsMutation from './InterestsMutation'

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

const GET_INTERESTS = gql`
  query getMyInterests($investorId: ID!) {
    getMyInterests(investorId: $investorId) {
      name
      categoryId
    }
  }
`

function InterestsForm(props) {
  const { classes } = props

  const { investorId } = props
  console.log(props)

  const { loading, data, error } = useQuery(GET_INTERESTS, {
    variables: {
      investorId: investorId,
    },
  })
  console.log(investorId)
  console.log(data)

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  return (
    <Paper className={classes.root}>
      <Title>My interests</Title>
      <TableRow>
        <TableCell component="th" scope="row">
          {data.getMyInterests.map((n) => {
            return (
              <Chip
                label={n.name}
                clickable
                style={{ background: '#35635b', color: '#ffffff' }}
              />
            )
          })}
        </TableCell>
      </TableRow>

      <InterestsMutation investorId={investorId} />
    </Paper>
  )
}

export default withStyles(styles)(InterestsForm)
