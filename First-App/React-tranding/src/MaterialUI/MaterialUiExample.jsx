import { Call, Delete, DeleteForever, Edit } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import React from 'react'
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Edit, DeleteIcon } from '@mui/icons-material';
export default function MaterialUiExample() {
    return (
        <>
            <Box sx={{ '& button': { m: 1 } }}>
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Box>

            <Box sx={{ '& button': { m: 1 } }}>
                <Button variant="contained" size='small'>small</Button>
                <Button variant="contained" size='medium'>medium</Button>
                <Button variant="contained" size='large'>large</Button>
            </Box>
            <h1 style={{ marginLeft: "60px" }}>Icon</h1>
            <Box sx={{ '& button': { m: 1 } }}>
                <Button variant="contained" size='small' startIcon={<DeleteForever/>} >Delete</Button>
                <Button variant="contained" size='small' endIcon={<Edit />}>Edit</Button>
                <Button variant="contained" size='small' startIcon={<Call></Call>} >Add call</Button>
            </Box>
        </>
    )
}
