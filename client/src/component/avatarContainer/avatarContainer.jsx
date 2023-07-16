import React from 'react'
import features from "./features.js";
import AvatarImg from '../avatar/avatarImg.jsx';
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, Tab, Tabs, Grid } from '@mui/material';


const AvatarContainer = () => {
    const base = useSelector(state => state.profile.base)
    
    return (
        <>
            { features.map((feature ) => {
                    return ((feature.name===tab) &&
                            <Grid key={feature.name} sx={{ padding:"0 0 200px 0", margin:"100px", height:"40vh" , bgcolor:"#f6f6f6", overflow: "hidden", overflowY: "scroll",zIndex:57  }} container spacing={{ xs: 2, md: 2}} columns={{ md: 16 }} justifyContent="center" >
                            {feature.array.map((variant) => {
                                const newBase = {...base, [feature.name]:[variant]}
                                return (<Grid key={variant}  item xs={3} sm={4} md={2} lg={2} sx={{paddding:"0 8px 0 8px"}}><AvatarImg name={variant} key={variant} base={newBase} /></Grid>)
                            })}
                        </Grid>
                        
                )})}
        </>
    )
}

export default AvatarContainer