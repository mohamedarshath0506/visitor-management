import React, { useEffect, useState } from "react"
import "../visitor-management/visitor-from.css"
import Visitor from "../visitor-management/visitor-from";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Button, FormControl, TextField } from "@mui/material"


function ValidPhoneNumber(props:any) {

    const [phoneNumberInput, setPhoneNumberInput] = useState<string>('');
    const [data,setData]=useState({})
    
    const [showPopup, setShowPopup] = useState(false)

    const handleShowPopupOpen = () => {
    let data = props.items.filter((personDetails:any)=> personDetails.phoneNumber === phoneNumberInput)
    console.log("data", data);

    if (data.length > 0) {
        setData(data[0])
    } 
    // else {
    //   console.log("phoneNumber",  setData({phoneNumber: phoneNumberInput}));
    // }
        setShowPopup(true)
    }

    const handleShowPopupClose = () => {
        setShowPopup(false)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'background.paper',
      };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumberInput(event.target.value);
      };
    
    return(
        <div>
            <Box sx={{boxShadow:5}} className="number-valid">
           
                <div className="phone-number">
                    <TextField sx={{width: 500}} type="number" size="small" label="Phone Number" variant="outlined" onChange={handlePhoneNumberChange} />
                </div>
                
                <div className="next-btn-container">
                    <Button onClick={handleShowPopupOpen} variant="contained">Next</Button>
                    <Button onClick={props.btn} variant="outlined">Cancel</Button>
                </div>

            </Box>
            <Modal open={showPopup}
            onClose={handleShowPopupClose}
            >
                <Box sx={style}>
                    <Visitor btn={props.btn} datas={props.data} data={data}/>
                </Box>
            </Modal>
               
        </div>
    )
}
export default ValidPhoneNumber