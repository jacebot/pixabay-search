import React from 'react'
import { Button, Distribution, Box, Image, Nav, Text } from 'grommet'
import styled from 'styled-components'

import { Favorite, Like, CloudUpload, Cloud } from 'grommet-icons'

const ImageOverlay = styled.div({
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.65)',
  width: '100%',
  height: 'auto',
  bottom: 0,
})

const Divider = styled.div({
  backgroundColor: '#FD6FFF',
  height: '100%',
  width: 1,
  display: 'inline-block',
  minHeight: 36,
})

const ImageCards = ({ data, savePicFunc, savedPics }) => {
  const imageClick = (id) => {
    const newItem = { picId: id }
    const oldArr = JSON.parse(localStorage.getItem('savedPics')) || []

    const newArr = JSON.stringify([
      ...oldArr.filter((e) => e.picId !== id),
      newItem,
    ])

    savePicFunc(newArr)
  }

  const photos =
    data && data.length > 0
      ? data.map((image, key) => {
          const {
            id,
            comments,
            downloads,
            favorites,
            webformatHeight,
            webformatURL,
            webformatWidth,
            tags,
            type,
            likes,
          } = image
          return {
            value: webformatHeight,
            src: webformatURL,
            width: webformatWidth,
            height: webformatHeight,
            key: key,
            alt: tags + ' : ' + type,
            id,
            likes,
            comments,
            downloads,
            favorites,
            isSaved: savedPics.find((e) => e.picId === id),
          }
        })
      : []

  return (
    <Distribution values={photos} style={{ minHeight: 600 }} fill>
      {(img) => (
        <Box fill style={{ position: 'relative' }}>
          <Image src={img.src} fit="cover" alt={img.alt} key={img.key} />
          <ImageOverlay>
            <Nav direction="row" align="center">
              <Button
                id={img.key}
                primary={img.isSaved ? true:false}
                icon={
                  img.isSaved ? (
                    <Cloud size="18px" color="brand" />
                  ) : (
                    <CloudUpload size="18px" color="accent-2" />
                  )
                }
                onClick={() => (img.isSaved ? {} : imageClick(img.id))}
                label={img.isSaved ? 'Saved' : 'Save'}
              />
              <Divider />
              {img.likes > 0 ? (
                <Text>
                  {img.likes}{' '}
                  <Like
                    size="16px"
                    color="accent-2"
                    style={{ marginRight: 6 }}
                  />
                </Text>
              ) : null}
              {img.favorites > 0 ? (
                <Text>
                  {img.favorites}{' '}
                  <Favorite
                    size="16px"
                    color="accent-2"
                    style={{ marginRight: 6 }}
                  />
                </Text>
              ) : null}
            </Nav>
          </ImageOverlay>
        </Box>
      )}
    </Distribution>
  )
}

export default ImageCards
