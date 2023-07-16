import { Box, Paper, Grid } from "@mui/material"
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import features from "./features.js";
import { useSelector } from "react-redux";
import AvatarImg from "../../component/avatar/avatarImg.jsx";
const Profile = () => {
    const [value, setValue] = useState(0);
    const base = useSelector(state => state.profile.base)
    const [tab, setTab] = useState("accessories")

    const handleChange = (event, newValue) => {
        setTab(newValue);
        console.log(newValue);
    };

    return (
        <>
            <Box className="w-screen h-[90vh] relative bg-[#f0f1f5]">

                <box className="h-screen w-screen flex justify-center ">
                        <AvatarImg icon={true} base={base}/>
                </box>

                <Box className="absolute bottom-0 w-screen">
                    <Box className=" mx-auto rounded-t-2xl shadow-xl"  sx={{ maxWidth: { xs: 320, sm: 480, md:768 }, bgcolor: 'background.paper' }}>
                        <Tabs
                            className=" "
                            value={tab}   
                            onChange={handleChange}
                            TabIndicatorProps={{
                                sx:{backgroundColor:"white",height:2, width:4}
                            }}
                            variant="scrollable"
                            textColor="text"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            sx={{
                                "& button": {borderRadius: 4},
                                "& buttom:hover":{backgroundColor:'#ecaed1' },
                                "& buttom.Mui-selected":{backgroundColor:'red', color:'#e80384'},

                            }}
                        >
                            <Tab className=" " label="Item One" />
                            <Tab className={value===1 ? "bg-black text-white" : ""} label="Item Two" />
                            <Tab value="accessories" label="accessories" />
                            <Tab value="accessoriesColor" label="accessoriesColor" />
                            <Tab value="clothing" label="clothing" />
                            <Tab value="clothesColor" label="clothesColor" />
                            <Tab value="eyebrows" label="eyebrows" />
                            <Tab value="eyes" label="eyes" />
                            <Tab value="facialHair" label="facialHair" />
                            <Tab value="facialHairColor" label="facialHairColor" />
                            <Tab value="hairColor" label="hairColor" />
                            <Tab value="hatColor" label="hatColor" />
                            <Tab value="mouth" label="mouth" />
                            <Tab value="skinColor" label="skinColor" />
                            <Tab value="top" label="top" />
                            <Tab value="backgroundColor" label="backgroundColor" />
                        </Tabs>
                        <Paper variant="outlined" elevation={3} className="h-30" sx={{ maxWidth: { xs: 320, sm: 480, md:768 }, height:320 }}>
                        { features.map((feature ) => {
                            return ((feature.name===tab) &&
                                    <Grid key={feature.name} sx={{ padding:"0 0 200px 10px", height:"40vh" , overflow: "hidden", overflowY: "scroll",zIndex:57  }} container spacing={{ xs: 2, md: 2}} columns={{ md: 16 }}  >
                                    {feature.array.map((variant) => {
                                        const newBase = {...base, [feature.name]:[variant]}
                                        return (<Grid key={variant}  item xs={3} sm={4} md={2} lg={2} sx={{paddding:"0 "}}><AvatarImg name={variant} key={variant} base={newBase} /></Grid>)
                                    })}
                                </Grid>
                                

                        )})}
                        </Paper>
                    </Box>
                    
                </Box>
            </Box>
        </>
    )
}

export default Profile