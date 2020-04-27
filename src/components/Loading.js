import React from 'react'
import { Spinner } from 'react-rainbow-components'
import { Box } from 'grommet'

const Loading = () => {
  return (
    <Box pad="large">
      <Spinner size="large" />
      <p style={{ fontSize: 24 }}>
        Fetching Your Results...&nbsp;&nbsp;Or something like that.
      </p>
    </Box>
  )
}

export default Loading
