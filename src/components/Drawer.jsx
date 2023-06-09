import React,{useState} from 'react';
import logo from '../assets/logo.png';
import { Drawer, Stack, Box, Typography, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const SideDrawer = (props) => {
    

  return (
     
    <Drawer open={props.open} onClose={props.onClose} sx={{ color: 'pink' }} elevation={0} >
          <Stack p={2} sx={{ alignItems: 'center' }} >
          <img src={logo} style={{ width: 100 }} />
      <Typography sx={{ fontSize: { md: 50, sm: 40, xs: 30 }, fontWeight: 'bold' }}>Web3 Forge</Typography>
          </Stack>
          
    <Stack sx={{ mt: 2 }}>
        Learning:
        <Link to={'/dashboard'}><Button sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold', mt: 1,width:'100%'  }}>⌚ Dashboard</Button></Link>
        <Link to={'/resources'} ><Button sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold', mt: 1,width:'100%'  }}>📖 Resources</Button></Link>
      <Button disabled sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>🏃‍♂️ Practise Projects 🔜</Button>
      <Button href='https://www.youtube.com/@Web3Forge' target = '_blank' sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>📀 Our Youtube</Button>
      <Button href='https://github.com/Web3-Forge' target = '_blank' sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>🧑‍🤝‍🧑 Gihtub Organization</Button>
    </Stack>
  
    <Stack sx={{ mt: 5 }}>
      Contribution:
      <Button disabled href='' sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold', mt: 1 }}>🤑 Get Sponsored 🔜</Button>
      <Button disabled sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>👨‍💻 Share your project 🔜</Button>
      <Link to={'/create-resource'}><Button sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold',width:'100%'  }}>✍️ Create Resource </Button></Link>
      <Button href='https://discord.gg/mQudDtCjrp' target='_blank' sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>🌐 Discord Server</Button>
      <Button disabled sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>💵 Sponsor Us 🔜</Button>
    </Stack>

    <Stack sx={{ mt: 5 }}>
      <Button disabled sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>⚙️ Settings 🔜</Button>
      <Button sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>📜 Readme</Button>
    </Stack>
    <Stack sx={{ alignItems: 'center', mt: 2 }} >v.1.5</Stack>
  </Drawer>
  )
}

export default SideDrawer