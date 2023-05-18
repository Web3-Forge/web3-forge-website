import React,{useState,useEffect} from 'react';
import { Stack, Typography, Button, Modal, TextField, MenuItem, InputLabel, FormControl,Select } from '@mui/material'
import SideDrawer from './drawer';
import { auth, db } from './firebaseConfig';
import { setDoc,doc,Timestamp,addDoc,collection } from 'firebase/firestore';

const CreateResource = () => {
  const [email, setEmail] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [authorName, setAutherName] = useState('');
  const [resName, setResName] = useState('');
  const [_level, setLevel] = useState('');
  const [type, setType] = useState('');
  const [authorUrl, setAuthorUrl] = useState('');
  const[file, setFile] = useState('');
 
  


  const isEmailVerified = () => {
    const user = auth.currentUser;
    setEmail(auth.currentUser.email);
    const verify = user.emailVerified;
    console.log(verify);
    setIsVerified(verify);
  }

  

  const handleVerification = () => {
    alert(`Verification email has been sent to ${email}`)
  }

  const handleSubmit = async () => {
    if (authorName !== '' && resName !== '' && _level !== '' && type!=='' && authorUrl !=='') {
      try {
        await addDoc(collection(db, 'resources'), {
          author: authorName,
          author_url: authorUrl,
          level: _level,
          res_title: resName,
          res_type: type,
          res_url: file,
          timestamp:Timestamp.now(),
        }).then(() => {
          alert('Data Added Successfully');
          setAutherName('');
          setAuthorUrl('');
          setResName('');
          setFile('');
        })
      } catch (error) {
        console.log(error)
      }
     
    } else {
      alert('Please make sure that every column is filled.')
     
    }
  }





  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    setTimeout(() => {  
      if(auth.currentUser !== null){
        isEmailVerified();
      }
     }, 3000)
  })

  if (isVerified == null) {
    return <Typography sx={{fontSize:30,color:'#fff',textAlign:'center'}}>Loading...</Typography>
  }

  if (isVerified == false) {
    return (
      <Modal open={openModal}>
        <Stack sx={{ backgroundColor: '#fff', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
          <Stack sx={{width:{md:500,sm:400,xs:300}}}>
            <img src={'https://t3.ftcdn.net/jpg/03/57/18/66/360_F_357186696_iyzZk8MNLmoAY13k2bNjqGHugsxbLYIt.jpg'} />
          </Stack>
          
          <Typography sx={{ fontSize: { md: 30, sm: 25, xs: 20 } }}>First, verify your email:</Typography>
          <Typography>Your Email: {email}</Typography>
          <Button variant='contained' sx={{ m: 1 }} onClick={()=>handleVerification()}>Request Verification Link</Button>
          <Typography>OR</Typography>
          <Button variant='text' sx={{m:1}} href='/dashboard' >Get Back Now</Button>
      </Stack>
    </Modal>
    )
  } else {
    return (
      <Stack sx={{ alignItems: 'center' }}>
        
         <SideDrawer open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)} />
        <Typography sx={{ color: '#fff', fontSize: { md: 30, sm: 25, xs: 20 },m:2 }}>Add your Resource</Typography>
        <Stack sx={{p:1,backgroundColor:'#fff',width:{md:400,sm:400,xs:300},borderRadius:3,alignItems:'center'}}>
          <Typography sx={{color:'#FF2D00'}}>NOTE:Please make sure that you've read the rules for adding a new resource.</Typography>
          OR
          <Button variant='contained' sx={{mt:1}}>Read Now</Button>
        </Stack>
        <Stack sx={{ width: { md: 500, sm: 500, xs: 350 }, backgroundColor: '#fff', mt: 2, borderRadius: 5, alignItems: 'center' }}>
          <Typography sx={{mt:2}}>Please fill out the form below:</Typography>
          <TextField variant='filled' label='Your full name' sx={{ mt: 2, width: '80%' }} value={authorName} onChange={(text)=>{setAutherName(text.target.value)}} />
          <TextField variant='filled' value={email} label='Your Email' sx={{ mt: 2, width: '80%' }} disabled />
          
          <TextField variant='filled' placeholder='resource url' value={file} onChange={(text)=>{setFile(text.target.value)}} sx={{ mt: 2, width: '80%' }}/>
          <TextField variant='filled' sx={{ mt: 2, width: '80%' }} label='Title of the resource' value={resName} onChange={(text)=>{setResName(text.target.value)}} />
          <Stack sx={{mt:2,flexDirection:'row'}}>
          <FormControl>
            <InputLabel id='diff_select'>Select DIfficulty</InputLabel>
            <Select labelId='diff_select' variant='standard' value={_level} sx={{width:150,color:'#000'}} onChange={(option)=>{setLevel(option.target.value)}}  >
              <MenuItem value='Basic' >Basic</MenuItem>
              <MenuItem value='Intermediate' >Intermediate</MenuItem>
              <MenuItem value='Advanced' >Advanced</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ml:1}}>
           <InputLabel id='type_select'>Resource Type</InputLabel>
            <Select labelId='type_select' variant='standard' value={type} sx={{width:150,color:'#000'}} onChange={(option)=>{setType(option.target.value)}}  >
              <MenuItem value='Article' >Article</MenuItem>
              <MenuItem value='Video' >Video</MenuItem>
            </Select>
          </FormControl>
          </Stack>
          <TextField placeholder='your portfolio/social media' label='Reach out details' sx={{ mt: 2, width: '80%' }} value={authorUrl} onChange={(text)=>{setAuthorUrl(text.target.value)}} />
          <Button variant='contained' sx={{m:2}} onClick={()=>{handleSubmit()}} >Submit</Button>
          
        </Stack>
        <Button onClick={()=>setIsDrawerOpen(true)}>Open Menu</Button>
      </Stack>
    )
  }
}

export default CreateResource;