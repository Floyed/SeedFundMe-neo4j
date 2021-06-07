import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
// import {
//   TableRow,
// } from '@material-ui/core'
// import FormControl from '@material-ui/core/FormControl'
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

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
  mutation mergeInvestorInterest($category: String!, $investorId: ID!) {
    mergeInvestorInterest(category: $category, investorId: $investorId) {
      categories {
        name
      }
    }
  }
`

function InterestsMutation(props) {
  let input
  const { investorId } = props
  // const { classes } = props

  const [addTodo, { data }] = useMutation(GET_INTERESTS)

  console.log(data)
  console.log(investorId)

  return (
    <div>
      {/* <FormControl className={classes.formControl}
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { category: input.value ,
            investorId: investorId} });
          input.value = '';
        }}>
      <TableRow>
        <TextField
          id="standard-full-width"
          label="Enter Interests"
          style={{ margin: 8 }}
          placeholder="Eg. Clothing"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          ref={node => {
            input = node;
          }}
        />

        <Button type="submit" variant="contained" color="primary">
          Add Interest
        </Button>
        </TableRow>
      </FormControl> */}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo({
            variables: { category: input.value, investorId: investorId },
          })
          input.value = ''
        }}
      >
        <input
          ref={(node) => {
            input = node
          }}
        />
        &nbsp;
        <Button
          type="submit"
          variant="contained"
          style={{ background: '#35635b', color: '#ffffff' }}
        >
          Add Interest
        </Button>
      </form>
    </div>
  )
}

export default withStyles(styles)(InterestsMutation)
