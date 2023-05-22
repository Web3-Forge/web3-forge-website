import React, { useState,useEffect } from 'react';
import { Drawer, Stack, Box, Typography, Button, TextField,Card,CardActionArea,CardContent } from '@mui/material';
import logo from '../assets/logo.png'
import { auth, db } from './firebaseConfig';
import { collection,getDocs, orderBy } from 'firebase/firestore';


const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [isVerified, setIsverified] = useState(false);
  const [upcomingResource,setUpcomingResource] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUpcomingResource = async () => {
    const col = collection(db, 'upcoming_resource');
    const snap = await getDocs(col,orderBy('timestamp','asc'));
    const list = snap.docs.map(doc => doc.data());
    setUpcomingResource(list);
    console.log(upcomingResource.length);
  }


  useEffect(() => {
    setTimeout(() => {  
      if(auth.currentUser !== null){
        setEmail(auth.currentUser.email);
        setIsverified(auth.currentUser.emailVerified);
        fetchUpcomingResource();
        setIsLoading(false)
      }
     }, 3000)
  },[isLoading])
  
  

  
  if (email == '') {
    return (
      <Stack sx={{alignItems:'center',mt:10}}>
        <img src='https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif' style={{ width: 200 }} />
        <Typography sx={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }} >Loading..</Typography>
        <Typography sx={{ color: '#fff' }}>Tip: If its taking too long then go back and try logging in again</Typography>
        <Button href='/' sx={{ color: '#fff' }} ><u>Go Back</u></Button>
        
      </Stack>
    )
  } else {

    return (
      <div>
        
        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} sx={{ color: 'pink' }} elevation={0} >
          <Stack p={2} sx={{ alignItems: 'center' }} >
            <img src={logo} style={{ width: 100 }} />
            <Typography sx={{ fontSize: { md: 50, sm: 40, xs: 30 }, fontWeight: 'bold' }}>Web3 Forge</Typography>
            Email:
            {email}
            {isVerified == true ?
              <Typography sx={{ backgroundColor: 'green', color: '#fff', p: 0.2 }}>Verified</Typography> :
              <Stack>
                <Typography sx={{ backgroundColor: 'red', color: '#fff', p: 0.2 }}>Not Verified</Typography>
                <Typography sx={{ fontSize: 13, textAlign: 'center', color: 'blue' }}><u>Verify Now</u></Typography>
              </Stack>
            }
          
          </Stack>
          <Stack sx={{ mt: 5 }}>
            Learning:
            <Button href='/resources'  sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold', mt: 1 }}>📖 Resources</Button>
            <Button disabled sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>🏃‍♂️ Practise Projects 🔜</Button>
            <Button href='https://www.youtube.com/@Web3Forge' target = '_blank' sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>📀 Our Youtube</Button>
            <Button href='https://github.com/Web3-Forge' sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>🧑‍🤝‍🧑 Gihtub Organization</Button>
          </Stack>
        
          <Stack sx={{ mt: 5 }}>
            Contribution:
            <Button  disabled href='' sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold', mt: 1 }}>🤑 Get Sponsored 🔜</Button>
            <Button disabled sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>👨‍💻 Share your project 🔜</Button>
            <Button href='/create-resource' sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>✍️ Create Resource </Button>
            <Button href='https://discord.gg/mQudDtCjrp' target='_blank' sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>🌐 Discord Server</Button>
            <Button disabled sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>💵 Sponsor Us 🔜</Button>
          </Stack>

          <Stack sx={{ mt: 5 }}>
            <Button disabled sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>⚙️ Settings 🔜</Button>
            <Button sx={{ borderBottom: 2, borderColor: '#000', fontWeight: 'bold' }}>📜 Readme</Button>
          </Stack>
          <Stack sx={{ alignItems: 'center', mt: 2 }} >v.1.5</Stack>
        </Drawer>
      
        <Stack sx={{ alignItems: 'center' }}>
      
          <Stack sx={{ flexDirection: { md: 'row' } }}>
            <Stack sx={{ width: { md: 600, sm: 500, xs: 320 }, m: 1 }}>
              <Stack sx={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', borderRadius: { md: 10, sm: 10, xs: 5 } }}>
                <Stack sx={{ p: { md: 3, sm: 3, xs: 2 } }}>
                  <Typography sx={{ fontSize: { md: 35, sm: 30, xs: 25 }, fontWeight: 'bold' }}>Hello Buddy!</Typography>
                  <Typography sx={{ fontSize: { md: 30, sm: 20, xs: 15 } }}  >Its good to see you here</Typography>
                </Stack>
                <Stack sx={{ width: { md: 180, sm: 180, xs: 100 } }}>
                  <img src={'https://img.freepik.com/premium-vector/illustration-young-man-with-greeting-gesture-man-says-hello-vector_310063-114.jpg'} />
                </Stack>
              </Stack>
            
              <Stack sx={{ width: { md: 600, sm: 500, xs: 320 }, mt: 3 }}>
                <Stack sx={{ flexDirection: 'row', backgroundColor: '#dbdbdb', alignItems: 'center', borderRadius: 3 }}>
                  <Stack sx={{ width: 50, p: { md: 2, sm: 2, xs: 1 } }}>
                    <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' />
                  </Stack>
                  <Stack>
                    <Typography sx={{ fontSize: { md: 25, sm: 22, xs: 15 } }}>Contribute in our code</Typography>
                    <Typography sx={{ fontSize: { md: 15, sm: 12, xs: 10 } }}>You can view our code on Github or raise an issue.</Typography>
                  </Stack>
                  <Button href='https://github.com/Web3-Forge/web3-forge-website' target='_blank'  sx={{ backgroundColor: '#000', color: '#fff', ml: { md: 7, sm: 3, xs: 1 }, width: { md: 100, sm: 100, xs: 20 } }}>
                   <Typography sx={{fontSize:{md:14,sm:14,xs:8}}}>View Code</Typography> 
                    </Button>
                </Stack>
              </Stack>
              <Stack sx={{ flexDirection: 'row', mt: 3 }}>
                <Button variant='contained' sx={{ width: { md: 200, sm: 150, xs: 130 }, backgroundColor: '#5689CE', borderRadius: 7 }} onClick={() => { setIsDrawerOpen(true) }} >
                  <Typography sx={{ fontSize: { md: 25, sx: 20, xs: 15 }, fontWeight: 'bold', }} >Open Menu</Typography>
                </Button>
                <Button variant='contained' sx={{ width: { md: 200, sm: 150, xs: 130 }, backgroundColor: 'grey', ml: 2, borderRadius: 7,":hover":{backgroundColor:"grey"} }} disableRipple disableElevation href='' >
                  <Typography sx={{ fontSize: { md: 25, sx: 20, xs: 15 }, fontWeight: 'bold', textAlign: 'center' }} >Get Sponsored </Typography>
                </Button>
              </Stack>
            
          
              <Stack sx={{ width: { md: 600, sm: 500, xs: 320 }, mt: 3, }}>
                <Stack sx={{ height: 500 }}>
                  <Typography sx={{ fontSize: { md: 30, sm: 25, xs: 20 }, fontWeight: 'bold', p: 2, color: '#fff' }}>Get Started:</Typography>
                  <Card sx={{m:0.5}}>
                    <CardActionArea href='https://web3-forge.github.io/web3-forge/Resources/all-resources/roadmap_for_web3' target='_blank' >
                    <CardContent>
                      <Typography sx={{fontWeight:'bold'}}>✔️ Complete Roadmap to Web3</Typography>
                    </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card sx={{m:0.5}}>
                    <CardActionArea target='_blank' href='https://web3-forge.github.io/web3-forge/Resources/all-resources/introduction_to_web3'>
                    <CardContent>
                      <Typography sx={{fontWeight:'bold'}}>✔️ Introduction to Web3</Typography>
                    </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card sx={{m:0.5}}>
                    <CardActionArea target='_blank' href='https://www.youtube.com/watch?v=fF_yTe7h1hQ'>
                    <CardContent>
                      <Typography sx={{fontWeight:'bold'}}>✔️ Free Blockchain Course (6+ hours) </Typography> 
                    </CardContent>
                    </CardActionArea>
                  </Card>
                </Stack>
              </Stack>
            
            </Stack>
          
          
          
            <Stack sx={{ width: { md: 600, sm: 500, xs: 320 }, m: 1 }}>
              <Stack sx={{ height: 500, backgroundColor: '#fff', borderRadius: 10 }}>
                <Typography sx={{ fontSize: { md: 30, sm: 25, xs: 20 }, fontWeight: 'bold', p: 2, color: '#000' }}>Upcoming Resources:</Typography>
                <Stack>
                  {upcomingResource.length !== 0?
                  upcomingResource.map((item, key) => {
                    var d = item.timestamp.toDate().toString();
                    
                    return (
                      <Stack sx={{ m: 1, backgroundColor: '#dbdbdb' }} key={key}>
                      <Typography sx={{ ml: 2, fontSize: {md:20,sm:20,xs:15},fontWeight:'bold' }}>{item.res_title}</Typography>
                      <Typography sx={{ml:2,fontSize: {md:15,sm:15,xs:12}}}>Coming Soon</Typography>
                    </Stack>
                    )
                  }): 
                    <Stack>
                      <img src='https://i.gifer.com/P4id.gif' />
                    </Stack>
                  
                }
                  
                </Stack>
              </Stack>

             
            </Stack>

          </Stack>
        </Stack>
       
      </div>
    )
  }
}

export default Dashboard