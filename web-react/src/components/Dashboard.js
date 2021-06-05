import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import InvestorsChart from './InvestorsChart'
export default function Dashboard() {
  const theme = useTheme()

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 500,
    },
  }))
  const classes = useStyles(theme)
  const fixedHeight = clsx(classes.fixedHeight)

  return (
    <React.Fragment>
      <div className={fixedHeight}>
        <InvestorsChart />
      </div>
    </React.Fragment>
  )
}
