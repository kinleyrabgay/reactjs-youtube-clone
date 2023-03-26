import { useState, useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'

import { Sidebar, Videos } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);
  // Life cycle hook which gets called when the component initally loads
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      // return promise
      .then((data) => setVideos(data.items))
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      <Box
        sx={{ 
          height: { sx: 'auto', md: '92vh' }, 
          borderRight: '1px solid #3d3d3d', 
          px: { 
            sx: 0, md: 2 
          }
        }}
      >
        <Sidebar 
          selectedCategory = {selectedCategory}
          setSelectedCategory = {setSelectedCategory}
        />
        <Typography 
          className='copyright'
          variant='body2'
          sx = {{
            mt: 1.5,
            color: '#fff'
          }}
        >
          Copyright 2023 Kinley
        </Typography>
      </Box>

      {/* Box for video list */}
      <Box pl={2} pt={1} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
        <Typography
          variant='h4'
          fontWeight='bold'
          mb={2}
          sx={{
            color:'white'
          }}
        >
          {selectedCategory} <span
            style={{ 
              color: '#F31503'
            }}
          >video
          </span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed