import React from 'react'
import {
  dataImageCategory,
  dataImageType,
  dataOrder,
} from '../assets/constants'
import { Box, TextInput, Select } from 'grommet'

import { Search, Reactjs } from 'grommet-icons'

const SearchRow = ({
  searchText,
  filterValues,
  getResultsFunc,
  setSearchTextFunc,
  setCategoryFunc,
  setTypFunc,
  setOrderByFunc,
}) => {
  const onChange = (event) => {
    const { value: newValue } = event.target

    if (!newValue.trim()) {
      setSearchTextFunc('')
    } else {
      setSearchTextFunc(newValue.toLowerCase())
      if (event.key === 'Enter') {
        getResultsFunc()
      }
    }
  }
  return (
    <Box direction="column" flex pad="medium" style={{ minHeight: 210 }}>
      <h1>
        <Reactjs className="App-logo" /> Welcome to Super C.oOL Image Search!{' '}
        <Reactjs className="App-logo" />
      </h1>
      <Box width="large" direction="row">
        <TextInput
          type="search"
          icon={<Search color="brand" />}
          placeholder="Search for a mundane pic...or an amazing one."
          value={searchText}
          onChange={onChange}
          onKeyDown={onChange}
        />
      </Box>
      <Box width="large" direction="row" align="center" justify="evenly">
        <Select
          placeholder="Category"
          value={filterValues.imageCategory}
          options={dataImageCategory}
          onChange={({ option }) => setCategoryFunc(option)}
        />

        <Select
          placeholder="Type"
          value={filterValues.imageType}
          options={dataImageType}
          onChange={({ option }) => setTypFunc(option)}
        />

        <Select
          placeholder="Order By"
          value={filterValues.orderBy}
          options={dataOrder}
          onChange={({ option }) => setOrderByFunc(option)}
        />
      </Box>
    </Box>
  )
}

export default SearchRow
