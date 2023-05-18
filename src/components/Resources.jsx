import React,{useState,useEffect,useLayoutEffect} from 'react'
import { Stack, Box, Typography, Button, TextField, Alert,Card,CardContent,CardActionArea } from '@mui/material';
import { auth, db } from './firebaseConfig';
import { collection,getDocs, orderBy,query } from 'firebase/firestore';
import SideDrawer from './drawer';

const Resources = () => {
  const [email, setEmail] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState([]);

  const loadRes = async () => {
    const col = collection(db, 'resources');
    const q = query(col,orderBy('timestamp','desc'))
    const snap = await getDocs(q); 
    const list = snap.docs.map(doc => doc.data());
    setResources(list)
    console.log(list)
  }


  useEffect(() => {
    setTimeout(() => {  
      if(auth.currentUser !== null){
        setEmail(auth.currentUser.email);
        setIsLoading(false);
        loadRes();
      }
     }, 3000)
  },[isLoading])


  if (email == '') {
    return (
      <Stack sx={{ alignItems: 'center',mt:10 }}>
        <img src='https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif' style={{ width: 200 }} />
        <Typography sx={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }} >Loading..</Typography>
        <Typography sx={{ color: '#fff' }}>Tip: If its taking too long then go back and try logging in again</Typography>
        <Button href='/' sx={{ color: '#fff' }} ><u>Go Back</u></Button>
      </Stack>
    )
  } else {
    return (
      <>
        <Button onClick={()=>setIsDrawerOpen(true)}>Menu</Button>
      <Stack sx={{ alignItems: 'center' }}>
        <SideDrawer open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)} />
        <Stack sx={{ flexDirection: { md: 'row',xs:"column-reverse" } }}>
          <Stack sx={{border:1,width:{md:600,sm:500,xs:320},backgroundColor:'#fff'}}>
              <Typography sx={{ color: '#000', fontWeight: 'bold', p: 1 }}>All latest resources:</Typography>
              
              {resources.length != 0 ?
                resources.map((items, key) => {
                  return (
                    <Card sx={{ borderBottom: 1,height:100 }} key={key} >
                        <CardActionArea href={items.res_url} target='_blank' >
                        <CardContent>
                          <Stack sx={{flexDirection:'row'}}>
                          <Typography sx={{backgroundColor:'#007fff',borderRadius:5,pr:0.5,pl:0.5,color:'#fff',width:{md:40,sm:40,xs:25},fontSize:{md:15,sm:15,xs:10}}}>{items.level}</Typography>
                          <Typography sx={{backgroundColor:'#d88cff',borderRadius:5,pr:0.5,pl:0.5,color:'#fff',width:{md:40,sm:40,xs:25},fontSize:{md:15,sm:15,xs:10},ml:1}}>{items.res_type}</Typography>
                          </Stack>
                    <Typography sx={{ fontSize: { md: 20, xs: 15, sm: 20 },fontWeight:'bold' }}>{items.res_title}</Typography>
                          <Typography sx={{ fontWeight: 'bold', fontSize: { md: 15, sm: 15, xs: 10 } }}>Author: <a href={items.author_url}>{items.author}</a></Typography>
                  </CardContent>
                  </CardActionArea>
              </Card>
                  )
                }) : <Typography sx={{textAlign:'center'}}>No Resource Found</Typography>
              }
              
              
          </Stack>

          <Stack sx={{border:1,width:{md:500,sm:400,xs:320}, p: 1,mt:{md:0,xs:2},ml:{md:2},borderRadius:5,height:{md:150},backgroundColor:'#fff',alignItems:'center'}}>
            <Typography sx={{ color: '#000', fontWeight: 'bold',fontSize:{md:30,sm:25,xs:20} }}>Did you know?</Typography>
            <Typography>You can also share your valuable content and get sponsored by us.</Typography>
            <Button variant='outlined' sx={{width:150,mt:3,alignSelf:'center',mb:2}}>Know more</Button>
          </Stack>
        </Stack>
      </Stack>
      </>
    )
  }
}

export default Resources