import React from 'react'
import { Typography,Stack,Button } from '@mui/material';
const Footer = () => {
  return (
    <Stack sx={{mt:6,backgroundColor:'#000',height:200,borderTop:1,width:'100%',borderColor:'#fff',flexDirection:'row',justifyContent:'center'}}>
    <Stack sx={{m:4}}>
              <Typography sx={{ color: '#fff' }}>© Web3 Forge</Typography>
              <Typography sx={{ color: '#fff' }}>v.1.4</Typography>
    </Stack>
          
    <Stack sx={{m:4}}>
        <a><Typography sx={{ color: '#fff' }}>Sponsor Us</Typography></a>
        <a><Typography sx={{ color: '#fff' }}>ReadMe</Typography></a>
        <a><Typography sx={{ color: '#fff' }}>Github</Typography></a>
        <a><Typography sx={{ color: '#fff' }}>Twitter</Typography></a>
        <a><Typography sx={{ color: '#fff' }}>Edit Page</Typography></a>
    </Stack>
    <Stack sx={{m:4}}>
        <a><Typography sx={{ color: '#fff' }}>Sign In</Typography></a>
        <a><Typography sx={{ color: '#fff' }}>Sign Up</Typography></a>
        <a><Typography sx={{ color: '#fff' }}>Privacy Policy</Typography></a>
        <a><Typography sx={{ color: '#fff' }}>Get Sponsored</Typography></a>
        <a><Typography sx={{ color: '#fff' }}>Discord</Typography></a>
    </Stack>
</Stack>
  )
}

export default Footer