import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import BusinessList from './BusinessList'

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
})

const GET_USER = gql`
  query getInvestors {
    investors {
      investorId
      name
    }
  }
`

function UserDropdown(props) {
  const { classes } = props
  const [investor, setInvestor] = React.useState('')
  const { loading, error, data } = useQuery(GET_USER)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  console.log(data)

  const handleChange = (event) => {
    setInvestor(event.target.value)
  }

  let list
  if (investor) {
    list = <BusinessList investorId={investor} />
  }

  return (
    <Paper className={classes.root}>
      <Title>Investing opportunities in Small businesses for an Investor</Title>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Investor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={investor}
          onChange={handleChange}
        >
          {data.investors.map((investor) => {
            return (
              <MenuItem value={investor.investorId}>{investor.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>

      {list}
    </Paper>
  )
}

export default withStyles(styles)(UserDropdown)
