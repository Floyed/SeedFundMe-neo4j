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
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import TextField from '@material-ui/core/TextField'

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
      city
      sales
      content
      state
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

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let [business, setBusiness] = React.useState(true)
  let [content, setContent] = React.useState(true)
  let [stateLoc, setStateLoc] = React.useState(true)
  let [city, setCity] = React.useState(true)
  let [sales, setSales] = React.useState(true)

  let state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  }

  const handleClick = (event, businessName, content, state, city, sales) => {
    console.log(businessName)
    console.log(content)
    console.log(city)
    console.log(sales)
    console.log(state)

    setBusiness(businessName)
    setContent(content)
    setStateLoc(state)
    setCity(city)
    setSales(sales)
    handleClickOpen()
  }

  const handleInputFocus = (e) => {
    this.setState({ focus: e.target.name })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

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
              {/* <TableCell key="categories">Categories</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getSuggestions.map((n) => {
              return (
                <TableRow
                  key={n.businessId}
                  onClick={(event) =>
                    handleClick(
                      event,
                      n.name,
                      n.content,
                      n.state,
                      n.city,
                      n.sales
                    )
                  }
                >
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
                  {/* <TableCell component="th" scope="row">
                    {n.categories}
                  </TableCell> */}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Enter payment information to invest in {business}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Location: {city}, {stateLoc}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Sales: {sales}
          </DialogContentText>

          <Cards
            cvc={state.cvc}
            expiry={state.expiry}
            focused={state.focus}
            name={state.name}
            number={state.number}
          />

          <form>
            <div style={{ padding: '10px' }}>
              <div style={{ display: 'block', 'margin-bottom': '10px' }}>
                <TextField
                  id="outlined-basic"
                  label="Card number"
                  name="number"
                  variant="outlined"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>

              <div style={{ 'margin-bottom': '10px' }}>
                <TextField
                  id="outlined-basic"
                  label="Expiry date"
                  name="expiry"
                  variant="outlined"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>

              <div style={{ 'margin-bottom': '10px' }}>
                <TextField
                  id="outlined-basic"
                  label="CVC"
                  name="cvc"
                  variant="outlined"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>

              <div style={{ display: 'block', 'margin-bottom': '10px' }}>
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  name="amount"
                  variant="outlined"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Invest
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default withStyles(styles)(BusinessList)
