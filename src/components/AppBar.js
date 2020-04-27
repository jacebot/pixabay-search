import React from 'react'

import { Box, Button, Heading, Stack, Text } from 'grommet'
import { DocumentCloud } from 'grommet-icons'

const AppBar = ({ savedPics, setShowSidebarFunc }) => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
      style={{ zIndex: '1' }}
    >
      <Heading level="3" margin="none">
        Super C.oOL Image Search
      </Heading>
      {savedPics.length > 0 ? (
        <Stack anchor="top-right">
          <Button
            icon={<DocumentCloud size="32px" />}
            onClick={setShowSidebarFunc}
          />

          <Box background="accent-1" pad={{ horizontal: 'xsmall' }} round>
            <Text>{savedPics.length}</Text>
          </Box>
        </Stack>
      ) : null}
    </Box>
  )
}

export default AppBar
