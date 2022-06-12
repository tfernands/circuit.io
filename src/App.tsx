import React, { createRef, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Circle, Group, Layer, Rect, Text } from "react-konva";
import { ViewportStage } from "./Viewport/Viewport";
import { AppBar, Box, Checkbox, Fab, IconButton, Menu, MenuItem, MenuList, Paper, Tab, Tabs, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from "@mui/material";
import { Terminal } from "./Component/Terminal";
import { Component } from "./Component/Component";
import { boxSizing, Container } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import HubIcon from '@mui/icons-material/Hub';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import { ThemeContext } from "@emotion/react";

export const InfoContex = React.createContext('Teste context');

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

function Info(props: any): React.ReactElement {
    return (
        <Box sx={{
            position: 'relative',
            ml: 2, mr: 2,
        }}>
            <div 
                style={{
                    position: 'absolute',
                    width: '100%',
                    marginTop: '1em',
                    paddingLeft: '1em', paddingRight: '1em',
                    maxHeight: '30vh', 
                    backgroundColor: 'rgba(255,255,255,.7)',
                    borderRadius: '1em',
                    backdropFilter: 'blur(1em)',
                    boxShadow: '0 .5em 1em 0 rgba(0,0,0,.2)',
                    boxSizing: 'border-box',
                    zIndex: 10,
                }}
            >
                <InfoContex.Consumer>
                    {info => (
                        <p>{info}</p>
                    )}
                </InfoContex.Consumer>
            </div>
        </Box>
    );
}

function App(): React.ReactElement {

    const [text, setText] = useState("Teste");
    const [grid, setGrid] = useState(20);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <InfoContex.Provider value="teste Ola Mundo">
        <Box sx={{height: '100vh', display: 'flex', flexDirection: "column"}}>
            <AppBar position="static" color="default" sx={{zIndex: 100}}>
                <Toolbar>
                    <HubIcon sx={{mr:1}}/>
                    <Typography sx={{mr:2}}>Circuit.io</Typography>
                    <Tabs
                        value={0}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="fullWidth"
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                        <Tab label="Main"/>
                        <Tab label="nand"/>
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Info/>
            <ViewportStage grid={grid}>
                <Layer>
                    <Terminal />
                    <Component />
                    <Component />
                </Layer>
            </ViewportStage>
            <Fab
                color="secondary"
                sx={fabStyle}
                onClick={handleClick}
            >
                
                <AddIcon/>
            </Fab>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        paddingLeft: 5,
                        paddingRight: 5,
                        transform: 'translateY(-10px)'
                    }
                }}
            >   
                <ToggleButtonGroup
                    orientation="vertical"
                    value={'list'}
                    exclusive
                    onChange={(e)=>{console.log(e)}}
                >
                    <ToggleButton value="bold" aria-label="bold" onClick={()=>{grid?setGrid(0):setGrid(20); handleClose()}}>
                        <Grid3x3Icon/>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Menu>
        </Box>
        </InfoContex.Provider>
    );
}

export default App;
