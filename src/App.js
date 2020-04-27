import React, { useState } from 'react'
import ImageCards from './components/ImageCards'
import AppBar from './components/AppBar'
import Loading from './components/Loading'
import Paginator from './components/Paginator'
import SideBar from './components/SideBar'
import { API_KEY } from './config'
import './App.css'

import { grommet } from 'grommet/themes'
import { deepMerge } from 'grommet/utils'
import {
  Box,
  Grommet,
  Main,
  ResponsiveContext
} from 'grommet'

import SearchRow from './components/SearchRow'

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Comic Neue',
      size: '18px',
      height: '20px',
    },
    drop: {
      background: { dark: 'neutral-2', light: 'neutral-2' },
      border: { radius: '10px' },
      zIndex: '13',
    },
    elevation: {
      dark: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
      light: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
    },
    input: {
      weight: 700,
    },
  },
})

const App = () => {
  const [results, setResults] = useState(null)
  const [page, setPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [showSidebar, setShowSidebar] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [imageCategory, setCategory] = useState(null)
  const [imageType, setType] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [savedPics, setSavedPics] = useState(
    JSON.parse(localStorage.getItem('savedPics')) || []
  )

  const getResults = () => {
    setLoading(true)
    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchText
        .toLowerCase()
        .trim()}&category=${imageCategory}&image_type=${imageType}&pretty=true&page=${page}&per_page=${itemsPerPage}&order=${orderBy}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setResults(result.hits)
          setTotal(result.total)
          setLoading(false)
          // set url array in state to be used by a gallery component..
        },
        (error) => {
          setLoading(false)
          setError(error)
        }
      )
  }

  const savePic = (newArr) => {
    localStorage.setItem('savedPics', newArr)
    setSavedPics(JSON.parse(newArr))
    setShowSidebar(false)
  }

  const handleOnChange = (event, page) => {
    setPage(page)
    getResults()
  }

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box background="dark-1" fill>
            <AppBar
              savedPics={savedPics}
              setShowSidebarFunc={() => setShowSidebar(!showSidebar)}
            />

            <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
              <Box flex align="center" justify="start">
                {loading ? (
                  <Loading />
                ) : (
                  <SearchRow
                    searchText={searchText}
                    getResultsFunc={() => getResults()}
                    setSearchTextFunc={setSearchText}
                    setCategoryFunc={setCategory}
                    setTypFunc={setType}
                    setOrderByFunc={setOrderBy}
                    filterValues={{imageCategory, imageType, orderBy}}
                  />
                )}
                {!loading && results ? (
                  <Main pad="large">
                    <h2>
                      {searchText.length > 0 && results <= 0
                        ? 'No Results'
                        : 'Results'}
                    </h2>
                    <Box direction="row" flex>
                      <Box fill>
                        {error || (searchText.length > 0 && results <= 0) ? (
                          <img
                            src={require('./assets/img/no-results.gif')}
                            className="rainbow-p-top_x-large rainbow-align_absolute-center"
                            alt="no results"
                          />
                        ) : (
                          <ImageCards
                            data={results}
                            savePicFunc={savePic}
                            savedPics={savedPics}
                          />
                        )}
  
                        <Paginator
                          pages={total}
                          activePage={page}
                          handlerFunc={handleOnChange}
                        />
                      </Box>
                    </Box>
                  </Main>
                ) : null}
              </Box>
              <SideBar
                size={size}
                showSidebar={showSidebar}
                savedPics={savedPics}
                setSavedPicsFunc={setSavedPics}
                setShowSidebarFunc={setShowSidebar}
              />
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

export default App
