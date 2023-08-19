import "../visitor-management/visitor-from.css"
import React, { useEffect, useState } from "react"
import {Paper} from "@mui/material"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"

import { DemoContainer } from '@mui/x-date-pickers/internals/demo/';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from "axios"
import ValidPhoneNumber from "../phone-number-from/phone-number-from"

const api = `http://localhost:3003/visitorHistory`

interface PersonDetails {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    purposeOfVisitor: string;
}
 

function Visitorhistory() {

    const [visitor, setVisitor] = useState(false)
    const handleOpen = () => {
        setVisitor(true)
    }

    const handleClose = () => {
        setVisitor(false)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'background.paper',
      };


    const [tableData, setTableData] = useState<PersonDetails[]>([]);
      console.log("tableData", tableData);
      
    const fetchData = () => {
        fetch(`${api}`)
        .then(responce => responce.json())
        .then(tableData => {
            setTableData(tableData)
        })
        .catch(error => {
            console.error("Error fetchinf data:", error);
            
        })
    }
   
    return (
        <div>
            <Paper className="table-container">
                <div className="table-heading">
                    <h1>VISITOR HISTORY</h1>

                    <div>
                        <Button 
                        onClick={handleOpen}>New Visiter</Button>
                    </div>

                    <div className="btn-container">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker/>
                            </DemoContainer>
                        </LocalizationProvider> 
                    </div>

                    <div className="btn-container">
                    <Button onClick={fetchData}>Fetch</Button>
                    </div>
                </div>
                {tableData.length > 0 && (
                <TableContainer sx={{boxShadow:5}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow >
                                <TableCell>Date</TableCell>
                                <TableCell>Photo</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>purpose of visitor</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {tableData.map((person:any) => (
                                <TableRow key={person.id}>
                                    <TableCell>08-16-2023</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{person.firstName}</TableCell>
                                    <TableCell>{person.lastName}</TableCell>
                                    <TableCell>{person.phoneNumber}</TableCell>
                                    <TableCell>{person.email}</TableCell>
                                    <TableCell>{person.purposeOfVisitor}</TableCell>
                                </TableRow>  
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                )}
            </Paper>   
            <Modal open={visitor}>
                <Box sx={style}>
                    <ValidPhoneNumber btn={handleClose} data={fetchData} items={tableData} />
                </Box>
            </Modal>
        </div>
    )
}

export default Visitorhistory