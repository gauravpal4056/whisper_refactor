import { Box, Container, Paper, TextField, Tooltip, Button } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import { useState, } from "react"
import axios from "axios";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setRoomID } from "../../store/authSlice"
import src from "/roomHero.png"
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Room = () => {

    const navigate = useNavigate()
    const [details, setDetails] = useState("")
    const [validRoom, setValidRoom] = useState("")
    const [roomName, setRoomName] = useState("")
    const dispatch = useDispatch()

    const handleClick = async () => {
        if(validRoom==="found"){
            dispatch(setRoomID(details))
            navigate('/profile')
        }else{
            try{
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/create/findRoom/${details}`)
                if(res.status === 200){
                    setValidRoom("found")
                    setRoomName(res.data.room.name)
                }
                else{
                    setValidRoom("error")
                    console.log("could not find room");
                }
            }catch(e){
                console.log(e);
                setValidRoom("error")
            }
        }
    }
    const handleChange = (e) => {
        setValidRoom("")
        const value = e.target.value;  
        setDetails(value)
    } 

    return (
        <>
            <Box className="h-screen w-screen bg-[#f0f1f5]">
                    {/* <Box className="flex items-center gap-1 p-3">
                        <div className=" h-12 w-12 bg-[url('/logo.png')] bg-cover bg-center " />
                        <h1 className="text-[#3e3e3e] text-lg uppercase font-bold">Whispers</h1>
                    </Box> */}
                    <Container maxWidth="sm" className="  md:w-[760px] flex flex-col items-center justify-center text-black">
                        <Paper elevation={2} className="p-5 md:p-10 flex flex-col gap-1" >
                            <h1 className="text-6xl text-[#e80384] my-5 font-extrabold">Enter Room ID </h1>
                            <Box className="flex justify-center"><img src={src} /></Box>
                            <Box className="flex gap-2">
                            {validRoom==="" ? <h1></h1> : validRoom==="found" ?
                                <>
                                    <CheckCircleOutlineIcon  className="text-green-500"/>
                                    <h1>Room Found : <span className="text-[#e80384] font-bold">{roomName}</span></h1>
                                </> 
                                    : 
                                <>
                                    <WarningIcon className="text-red-600" />
                                    <h1 className="text-red-600"> could not find room please try again</h1>
                                </> }
                            </Box>
                            <TextField value={details} onChange={handleChange} className="rounded-3xl" id="filled-basic" label="Room Id" variant="filled" />
                            <Button onClick={handleClick} className="text-white hover:text-[#e80384] my-1 bg-[#e80384] flex items-center p-3 rounded-xl"><h1 className="text-center font-bold w-full text-xl">{validRoom==="found" ? "Enter" : "Search" }</h1></Button>
                            <Box className="flex   gap-3 ">
                                <Tooltip title="Room ID is Your exclusive space where all your friends are logged in, connecting you with your known ones. " variant="solid">
                                    <InfoIcon/>
                                </Tooltip>
                                <h1 className="text-md text-gray-500">dont have a room ID? <span className="text-[#e80384] underline cursor-pointer">create one</span>  </h1>
                            </Box>
                        </Paper>
                    </Container>    
            </Box>
        </>
    )
}

export default Room