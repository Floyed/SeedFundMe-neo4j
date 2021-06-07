import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const WhiteTextTypography = withStyles({
  root: {
    color: '#35635b',
  },
})(Typography)

export default function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="secondary" gutterBottom>
      <WhiteTextTypography>{props.children}</WhiteTextTypography>
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.node,
}
