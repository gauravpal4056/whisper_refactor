import { Box, Container, Paper, TextField, Tooltip, Button, Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
// import AvatarImg from "../avatar/avatar"
import { Link, Outlet } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Nav = (props) => {

    const toggleColorMode = () => {
        props.toggle(!props.mode)
    }
    const [selected, setSelected] = useState("Home");
    const user = useSelector(state => state.auth.user)
    const handleClick = (e) => {
        console.log(e.target.name);
        if(e.target.name)
            setSelected(e.target.name)
    }

    const logout = () => {
            localStorage.clear()
            window.location.reload()
    }

    return (
        <>
            <Box className="flex justify-between bg-[#f0f1f5]">
                <Box className="flex items-center gap-1 p-3">
                    <div className=" h-12 w-12 bg-[url('/logo.png')] bg-cover bg-center " />
                    <h1 className="text-[#3e3e3e] text-lg uppercase font-bold">Whispers</h1>
                </Box>
                <Box className="flex items-center">
                    {user ? <Box sx={{display:"flex", flexDirection:"row", alignItems:"center" }}> 
                                <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                                                {props.mode === false ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                                <IconButton sx={{ pl: 1 }} onClick={toggleColorMode} color="inherit">
                                    <LogoutIcon onClick={logout}/>
                                </IconButton>
                            </Box> : <Typography className="m-3 font-semibold cursor-pointer" onClick={logout} > Logout   </Typography>}
                </Box>
            </Box>
            <Outlet />
        </>
    )
}

export default Nav