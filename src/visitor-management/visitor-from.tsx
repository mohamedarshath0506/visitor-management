//import "../visitor-management/visitor-from.css"
import React, { useEffect, useState } from "react"
import { Box, Button, FormControl, TextField } from "@mui/material"
import Visitorhistory from "../visitor-history/visitor-history"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
   firstName: string;
   lastName: string;
   phoneNumber: string;
   email: string;
   purposeOfVisitor: string;
}


function Visitor(props:any) {

   const [formValues, setFormValues] = useState<FormValues>({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      purposeOfVisitor:"",
   })
console.log("formValues", formValues);

   

   const [errorFirstName, setErrorFirstName] = useState("")
   
   const [errorLastName, setErrorLastName] = useState("")

   const [errorPhoneNumber, setErrorPhoneNumber] = useState("")

   const [errorEmail, setErrorEmail] = useState("")

   const [errorPurposeOfVisitor, setErrorPurposeOfVisitor] = useState("")

   const firstNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormValues((prevFirstName) => ({
         ...prevFirstName,
         firstName: value, 
      }))
   }

   const lastNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormValues((preLastName) => ({
         ...preLastName,
         lastName: value
      }))
   }

   const phoneNumberValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormValues((prePhoneNumber) => ({
         ...prePhoneNumber,
         phoneNumber: value
      }))
   }

   const emailValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormValues((preEmail) => ({
         ...preEmail,
         email: value
      }))
   }

   const purposeOfVisitorValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormValues((prePurposeOfVisitor) => ({
         ...prePurposeOfVisitor,
         purposeOfVisitor: value
      }))
   }

   const validateEmail = (email: string): boolean => {
      const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return pattern.test(email)
   }

   const handleSubmit = async (event:any) => {
      event.preventDefault()
      let isValid = true;
     

      if(!formValues.firstName) {
         setErrorFirstName("Enter Your First Name")
         isValid= false
      }else {
         setErrorFirstName("")
      }

      if(!formValues.lastName) {
         setErrorLastName("Enter Your Last Name")
         isValid = false
      }else {
         setErrorLastName("")
      }

      if(!formValues.phoneNumber) {
         setErrorPhoneNumber("Enter Your Phone NUmber")
         isValid = false
      }else if (formValues.phoneNumber.length < 10) {
         setErrorPhoneNumber("Enter Phone Number Ten")
         isValid = false
      }else if (formValues.phoneNumber.length > 10) {
         setErrorPhoneNumber("Ten Number Only")
         isValid = false
      }else {
         setErrorPhoneNumber("")
      }

      if(!formValues.email) {
         setErrorEmail("Enter email format")
         isValid = false;
      } else if (!validateEmail(formValues.email)) {
         setErrorEmail("Invalid email format")
         isValid = false;
      }else {
         setErrorEmail("")
      }

      if(!formValues.purposeOfVisitor) {
         setErrorPurposeOfVisitor("Enter Purpose Of Visitor")
         isValid = false
      }else{
         setErrorPurposeOfVisitor("")
      }
   
      if(isValid) {
         try {
            const responce = await axios.post(`http://localhost:3003/visitorHistory`, formValues)
         if(responce){
            props.datas()
         }
         }catch (error) {
            console.error("Error", error)
         }
         toast.success('Thank You', {
            position: toast.POSITION.TOP_CENTER
        });
      }
   }

   useEffect(() => {
      if(formValues) {
         setFormValues({...formValues, firstName: props.data.firstName, lastName: props.data.lastName, phoneNumber: props.data.phoneNumber, email: props.data.email, purposeOfVisitor: props.data.purposeOfVisitor});
      }
   },[props.data])

   console.log("formValues",formValues)

return (
   
   <div className="container">
      <div>
         <Box sx={{boxShadow:5}} className="box-model">
        
               <div className="title" >
                  <FormControl className="heading">NEW VISITOR</FormControl>
               </div>
              
               <div className="visitor-register-from">
                  <TextField type="text" size="small" label="First Name" variant="outlined" value={props.data.firstName} onChange={firstNameValue}/>
               </div>
               <p className="error-message">{errorFirstName}</p>
               <div className="visitor-register-from">
                  <TextField type="text" size="small" label="Last Name" variant="outlined" value={props.data.lastName} onChange={lastNameValue}/>
               </div>
               <p className="error-message">{errorLastName}</p>
               <div className="visitor-register-from">   
                  <TextField type="number" size="small" label="Phone Number" variant="outlined" value={props.data.phoneNumber} onChange={phoneNumberValue} />
               </div>
               <p className="error-message">{errorPhoneNumber}</p>
               <div className="visitor-register-from">
                  <TextField type="email" size="small" label="Email" variant="outlined" value={props.data.email} onChange={emailValue} />
               </div>
               <p className="error-message">{errorEmail}</p>
               <div className="visitor-register-from">
                  <TextField type="textarea" label="Purpose of visitor" variant="outlined" multiline rows={4} value={props.data.purposeOfVisitor} onChange={purposeOfVisitorValue}/> 
               </div>
               <p className="error-message">{errorPurposeOfVisitor}</p>
               
               <div className="submit-btn-container">
                  <Button className="submit-btn" variant="contained" onClick={handleSubmit}>Submit</Button>
                  <ToastContainer />
                  <Button onClick={props.btn} variant="outlined">Cancel</Button>
                  
               </div>
         </Box>
      </div>
   </div>
)

}

export default Visitor