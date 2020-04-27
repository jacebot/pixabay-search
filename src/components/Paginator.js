import React from 'react'
import { Pagination } from 'react-rainbow-components'
import { Box } from 'grommet'

const Paginator = ({ pages, activePage, handlerFunc }) => {
  return pages > 10 ? (
    <Box direction="row" flex>
      <Box direction="column" flex>
        <h3>Current Page: {activePage}</h3>
        <Pagination
          className="rainbow-m_auto"
          pages={pages}
          activePage={activePage}
          onChange={handlerFunc}
        />
      </Box>
    </Box>
  ) : null
}

export default Paginator
