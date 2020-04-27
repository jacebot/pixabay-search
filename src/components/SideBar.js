import React from 'react'

import { Box, Button, Collapsible, Layer, Text } from 'grommet'

import { DocumentMissing, FormClose } from 'grommet-icons'

const SideBar = ({
  size,
  savedPics,
  showSidebar,
  setSavedPicsFunc,
  setShowSidebarFunc,
}) => {
  const removeAll = () => {
    setSavedPicsFunc([])
    localStorage.removeItem('savedPics')
    setShowSidebarFunc(false)
  }

  const removeSingle = (pid) => {
    const oldArr = JSON.parse(localStorage.getItem('savedPics'))
    const newArr = JSON.stringify([...oldArr.filter((e) => e.picId !== pid)])

    localStorage.setItem('savedPics', newArr)
    setSavedPicsFunc(JSON.parse(newArr))
    setShowSidebarFunc(false)
  }

  return !showSidebar || size !== 'small' ? (
    <Collapsible direction="horizontal" open={showSidebar}>
      <Box
        background="light-2"
        tag="header"
        justify="end"
        align="center"
        direction="row"
      >
        Close&nbsp;
        <Button
          icon={<FormClose />}
          onClick={() => setShowSidebarFunc(false)}
        />
      </Box>
      <Box
        width="medium"
        background="light-2"
        elevation="small"
        align="center"
        justify="center"
        direction="row"
        onClick={() => removeAll()}
      >
        <Text color="red">Remove All Saved Pics</Text>
        <Button icon={<DocumentMissing color="red" />} />
      </Box>
      <hr />
      {savedPics.map((item, i) => {
        return (
          <Box
            key={i}
            width="medium"
            background="light-2"
            elevation="small"
            align="center"
            justify="center"
            direction="row"
            onClick={() => removeSingle(item.picId)}
          >
            <Text color="brand">Pic Id: {item.picId}</Text>
            <Button icon={<DocumentMissing color="red" />} />
          </Box>
        )
      })}
    </Collapsible>
  ) : (
    <Layer>
      <Box
        background="light-2"
        tag="header"
        justify="end"
        align="center"
        direction="row"
      >
        Close&nbsp;
        <Button
          icon={<FormClose />}
          onClick={() => setShowSidebarFunc(false)}
        />
      </Box>
    </Layer>
  )
}

export default SideBar
