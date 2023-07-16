import { Box, Container, Paper } from "@mui/material"
import { signInWithPopup } from "firebase/auth"
import {auth, provider} from "../../utils/firebase"
import axios from "axios"
import {  useDispatch } from "react-redux"
import { setGoogleId, setName, setUser } from "../../store/authSlice"

import src from "/googleLogo.png"
const Login = () => {

    const dispatch = useDispatch()

    const login = async() => {
        
        try {
            const dataG = await signInWithPopup(auth, provider)
            const uid = dataG.user.uid
            const url = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/checkUser/${uid}`
            const {data} = await axios.get(url );
            if(data.exist){
                dispatch(setUser(data))
                console.log("user_exists");
                }
            else{
                dispatch(setGoogleId(dataG.user.uid))
                dispatch(setName(dataG.user.displayName))
            }
            localStorage.setItem("uid", dataG.user.uid)
            window.location.reload()
        }catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
            <Box className="h-screen w-screen flex md:flex-row flex-col  bg-[#f0f1f5] ">
                <Box>
                    <Box className="flex items-center gap-1 p-3 m-6">
                        <div className=" h-12 w-12 bg-[url('/logo.png')] bg-cover bg-center " />
                        <h1 className="text-[#3e3e3e] text-lg uppercase font-bold">Whispers</h1>
                    </Box>
                    <Container maxWidth="sm" className="py-10 md:mt-20 md:w-[760px] flex flex-col items-center justify-center text-black">
                        <Paper elevation={2} className="p-5 md:p-10 flex flex-col gap-1" >
                            <h1 className="text-6xl text-[#e80384] my-5 font-extrabold">Get Started </h1>
                            <Box><h1 className="text-3xl w-full font-bold my-2 text-center">Welcome Back!</h1></Box>
                            <h1 className="text-lg text-gray-500">Login or Signup with Google </h1>
                            <button onClick={login} className="text-white my-1 bg-[#e80384] flex items-center p-3 rounded-xl"><img className="w-5 h-5" src={src} /><h1 className="text-center w-full text-xl">Login or Signup</h1></button>
                        </Paper>
                    </Container>
                </Box>
                <div className=" w-full h-full bg-[url('/loginHero3.jpg')] bg-cover bg-center rounded-t-3xl md:rounded-l-3xl" />
            </Box>
        </>
    )
}

export default Login