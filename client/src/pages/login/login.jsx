import { Box, Container, Paper } from "@mui/material"
import src from "/googleLogo.png"
const Login = () => {
    return (
        <>
            <Box className="h-screen w-screen flex md:flex-row flex-col gap-3 bg-[#f0f1f5] p-0 ">
                <Box>
                    <Box className="flex items-center gap-3">
                        <div className=" h-14 w-14 bg-[url('/logo.png')] bg-cover bg-center " />
                        <h1 className="text-black text-xl uppercase font-extrabold">Whispers</h1>
                    </Box>
                    <Container maxWidth="sm" className="py-10 md:mt-20 md:w-[760px] flex flex-col items-center justify-center text-black">
                        <Paper elevation={3} className="p-5 md:p-10 flex flex-col gap-1" variant="outlined">
                            <h1 className="text-6xl text-[#e80384] my-4">Get Started </h1>
                            <Box><h1 className="text-3xl w-full font-extrabold/v">Welcome Back!</h1></Box>
                            <h1 className="text-lg text-gray-500">Login or Signup with Google </h1>
                            <button className="text-white my-1 bg-[#e80384] flex items-center "><img className="w-5 h-5" src={src} /><h1 className="text-center w-full text-xl">Login/signup</h1></button>
                        </Paper>
                    </Container>
                </Box>
                <div className=" w-full h-full bg-[url('/loginHero3.jpg')] bg-cover bg-center rounded-t-3xl md:rounded-l-3xl" />

            </Box>
        </>
    )
}

export default Login