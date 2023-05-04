import React,{useState} from 'react'
import { Typography,Stack,Button,Modal,TextField } from '@mui/material';
import '../App.css'
import logo from '../assets/logo.png'
import resource from '../assets/resource.png';
import Footer from './Footer';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Link,Navigate } from 'react-router-dom';

const Home = () => {
    const [signInModalOpen, setSignInModalOpen] = useState(false);
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);
    const [SignedInEmail, setSignedInEmail] = useState('');
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')

    const LogInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then((res) => {
            const credential = GoogleAuthProvider.credentialFromResult(res);
            const token = credential.accessToken;
            console.log(res.user.email)
            setSignedInEmail(res.user.email);
            setSignInModalOpen(false);
            setSignUpModalOpen(false);
        })
    }


    const SignIn = async () => {
       /*  if (email != '' || pass !== '') {
            try {
                await signInWithEmailAndPassword(auth, email, pass).then((res) => {
                    console.log(res.user.email);
                    setSignedInEmail(res.user.email);
                    
                    setSignInModalOpen(false);
                    setEmail('');
                    setPass('');
                })
                
           } catch (error) {
               alert(error.message)
           }
          
       } else {
           alert('please enter Email & password')
       } */
    }


    const SignInModal = () => {
        return (
<Stack>
            <Modal open={signInModalOpen} onClose={()=>setSignInModalOpen(false)}>
                <Stack sx={{ backgroundColor: '#fff', height: '100%' }}>
                <Button sx={{width:50}} onClick={()=>{setSignInModalOpen(false)}} >Back</Button>
                    <Stack sx={{alignItems:"center",justifyContent:'center'}}>
                        <img src={logo} style={{width:200}} />
                        <Typography sx={{ fontWeight: 'bold', fontSize: { md: 50, sm: 40, xs: 30 } }}>Web3 Forge</Typography>
                        <TextField disabled placeholder='Enter Email' sx={{width:{md:400,sm:400,xs:300},mt:2}} type='email' onChange={(text)=>setEmail(text.target.value)} />
                        <TextField disabled placeholder='Enter Password' sx={{ width: { md: 400, sm: 400, xs: 300 }, mt: 2 }} type='password' onChange={(text)=>setPass(text.target.value)} />
                        <Button disabled variant='outlined' sx={{ mt: 2 }} onClick={()=>{SignIn()}} >Sign In</Button>
                        <Typography sx={{color:'red',fontSize:15,width:300}}>Cannot login using email-password at this moment, try logging with Google</Typography>
                        <Typography sx={{ m: 5, fontSize: 30 }}>OR</Typography>
                        <Button variant='contained'  sx={{color:'#fff'}} onClick={()=>{LogInWithGoogle()}} >  Login With Google</Button>
                    </Stack>
                </Stack>
            </Modal>
            </Stack>
        )
    }

    const SignUp = async () =>{
        if (email != '' || pass !== '') {
             try {
                 await createUserWithEmailAndPassword(auth, email, pass).then((res) => {
                     setSignedInEmail(res.user.email);
                     setSignUpModalOpen(false);
                     setEmail('');
                     setPass('');
                 })
                 
            } catch (error) {
                alert(error.message)
            }
           
        } else {
            alert('please enter Email & password')
        }
    }   



    const SignUpModal = () => {
        return (
            <Modal open={signUpModalOpen} onClose={() => setSignUpModalOpen(false)}>
                <Stack sx={{ backgroundColor: '#fff', height: '100%' }}>
                <Button sx={{width:50}} onClick={()=>{setSignUpModalOpen(false)}} >Back</Button>
                    <Stack sx={{alignItems:"center",justifyContent:'center'}}>
                        <img src={logo} style={{width:200}} />
                        <Typography sx={{ fontWeight: 'bold', fontSize: { md: 50, sm: 40, xs: 30 } }}>Web3 Forge</Typography>
                        <TextField placeholder='Enter Email' sx={{width:{md:400,sm:400,xs:300},mt:2}} type='email'  onChange={(text)=>setEmail(text.target.value)} />
                        <TextField placeholder='Enter Password' sx={{ width: { md: 400, sm: 400, xs: 300 }, mt: 2 }} type='password'  onChange={(text)=>setPass(text.target.value)} />
                        <Button variant='outlined' sx={{ mt: 2 }} onClick={()=>{SignUp()}} >Sign Up</Button>
                        <Typography sx={{ m: 5, fontSize: 30 }}>OR</Typography>
                        <Button variant='contained'  sx={{color:'#fff'}} onClick={()=>{LogInWithGoogle()}} >  Sign Up With Google</Button>
                    </Stack>
                </Stack>
            </Modal>
        )
    }




  return (
      <Stack sx={{ alignItems: 'center' }} >
          {SignUpModal()}
            {SignInModal()}
          <Stack sx={{mt:10,textAlign:'center'}}>
          <Typography sx={{ fontWeight: 'bold', color: '#116DFF', fontSize: { md: 50, sm: 40, xs: 30 }}}>Learn, build & grow together</Typography>
              <Typography sx={{ color: '#fff', fontSize: { md: 30, sm: 25, xs: 20 } }}>Understand Web3 technology and <br /> build Dapps collectively.</Typography>
          </Stack>
          
              {SignedInEmail == '' ?
                <Stack sx={{ flexDirection: 'row', alignItems: 'center', mt: 2 }}>
                <Button variant='contained' sx={{backgroundColor:'#116DFF'}} onClick={()=>{setSignUpModalOpen(true)}} >Sign Up</Button>
                <Button sx={{ color: '#fff', ml: 2}} onClick={()=>{setSignInModalOpen(true)}} >Sign In</Button>
              </Stack> :
              <Stack>
                  <Link to={'/dashboard'}>
                      <Button variant='contained' sx={{ color: '#fff', mt: 2, backgroundColor: '#116DFF' }}>
                        <Typography sx={{fontWeight:'bold'}}>Open Dashboard</Typography>  
                      </Button></Link>
                  <Typography sx={{color:'#fff',textAlign:'center',fontSize:10}}>Logged In with: <br/>{SignedInEmail}</Typography>
              </Stack>
              }
                  
                   
                  
        
                 
         
          
          <Stack sx={{mt:5,flexDirection:{md:'row',sm:'row',xs:'column-reverse'},alignItems:'center',textAlign:{md:'left',xs:'center',sm:'left'}}}>
              <Stack sx={{ alignItems:{md:'start',sm:'start',xs:'center'}}}>
              <Typography sx={{ color: '#fff', fontSize: { md: 40, sm: 30, xs: 20 }, fontWeight: 'bold', mr: { md: 15, sm: 5, xs: 0 }, mt: { md: 0, sm: 0, xs: 3 } }}>Empowering <br />Web3 with Open Source</Typography>
              <Typography sx={{color:'#fff',fontSize:{md:20,sm:15,xs:13}}}>Learn and contribute in our amazing open source projects.<br/> Especially built for Web3 learners/devs/enthusiasts</Typography>
              <Button sx={{width:200,color:'#fff',border:1,mt:2}}>View Our Github Org</Button>
              </Stack>
              <Stack sx={{ width: { md: 300, sm: 300, xs: 200 } }}>
                  <img src={'https://cdn.pixabay.com/photo/2014/04/03/11/55/globe-312563__340.png'} />
              </Stack>
          </Stack>

          <Stack sx={{mt:5,flexDirection:{md:'row-reverse',sm:'row-reverse',xs:'column-reverse'},alignItems:'center',textAlign:{md:'left',xs:'center',sm:'left'}}}>
              <Stack sx={{ ml: { md: 10, sm:2, xs: 0 }, mt: { md: 0, sm: 0, xs: 0 }}}>
              <Typography sx={{ color: '#fff', fontSize: { md: 40, sm: 30, xs: 20 }, fontWeight: 'bold', }}>Avail the best <br />resources</Typography>
              <Typography sx={{color:'#fff',fontSize:{md:20,sm:15,xs:13}}}>Get the best web3 resources present all over the internet.<br/> At one place.</Typography>
              </Stack>
              <Stack sx={{ width: { md: 500, sm: 350, xs: 300 } }}>
                  <img src={resource} />
              </Stack>
          </Stack>

          <Stack sx={{mt:5,flexDirection:{md:'row',sm:'row',xs:'column-reverse'},alignItems:'center',textAlign:{md:'left',xs:'center',sm:'left'}}}>
              <Stack sx={{ alignItems:{md:'start',sm:'start',xs:'center'}}}>
              <Typography sx={{ color: '#fff', fontSize: { md: 40, sm: 30, xs: 20 }, fontWeight: 'bold', mr: { md: 15, sm: 5, xs: 0 }, mt: { md: 0, sm: 0, xs: 3 } }}>Get Sponsored by us</Typography>
              <Typography sx={{color:'#fff',fontSize:{md:20,sm:15,xs:13}}}>Learn, contribute and earn by working with us.<br/> Opportunity for Web3 devs/enthusiasts, content creators</Typography>
              <Button sx={{width:200,color:'#fff',border:1,mt:2}}>Checkout Ways</Button>
              </Stack>
              <Stack sx={{ width: { md: 300, sm: 300, xs: 200 } }}>
                  <img src={'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-money-clipart-with-sack-png-image_5826043.png'} />
              </Stack>
          </Stack>

          <Stack sx={{mt:6,flexDirection:{md:'row',sm:'row',xs:'column'}}}>
              <Stack sx={{border:2,borderBottomLeftRadius:40,borderColor:'#fff',width:300,alignItems:'center',p:{md:4,xs:1,sm:2},borderTopLeftRadius:40,borderTopRightRadius:{md:0,sm:0,xs:40},borderBottomRightRadius:{md:0,sm:0,xs:40}}}>
                  <Stack sx={{width:200}}>
                  <img src={'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png'} />
                  </Stack>
                  <Typography sx={{ color: "#5865F2", mt: 2, fontWeight: 'bold',fontSize:{md:30,sm:27,xs:26},textAlign:'center' }}>Join our Discord Server</Typography>
                  <Typography sx={{color:'#fff',mt:2,textAlign:'center',fontSize:{md:25,sm:20,xs:18}}}>Build awesome projects with professionals & developers and contribute to modern technology.</Typography>
                    <Button variant='contained' sx={{mt:2}}>Join Now</Button>
              </Stack>

              <Stack sx={{border:2,borderBottomRightRadius:40,borderColor:'#fff',width:300,alignItems:'center',p:{md:4,xs:1,sm:2},borderTopRightRadius:40,mt:{md:0,sm:0,xs:2},ml:{md:0,sm:2,xs:0 },borderTopLeftRadius:{md:0,sm:0,xs:40},borderBottomLeftRadius:{md:0,sm:0,xs:40}}}>
                  <Stack sx={{width:150}}>
                  <img src={'https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg'} />
                  </Stack>
                  <Typography sx={{ color: "#2DAAE1", mt: 2, fontWeight: 'bold',fontSize:{md:30,sm:27,xs:26},textAlign:'center' }}>Follow us on Twitter</Typography>
                  <Typography sx={{color:'#fff',mt:2,textAlign:'center',fontSize:{md:25,sm:20,xs:18}}}>Get valuable content and updates about us. Stay updated with new upcoming project and resources</Typography>
                    <Button variant='contained' sx={{mt:2}}>Join Now</Button>
              </Stack>
          </Stack>
          <Footer />

    </Stack>
  )
}

export default Home;