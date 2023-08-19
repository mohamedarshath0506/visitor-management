import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { useScrollTrigger } from "@mui/material";



//export default class PersonList extends React.Component {

//export function PersonList(props) {
    
const PersonList = () => {

    const [data, setDate] = useState(null);
    //console.log("data", data);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/visitorHistory`);
            setDate(response.data);
            setLoading(false);
        }catch (error) {
            console.error("Error", error)
            setLoading(false)
        }
    }

    // state = {
    //     persons: [],
    // };

    // componentDidMount = ()=> {
    //     axios.get(`http://localhost:3000/visitorHistory`)
    //     .then(res => {
    //         console.log(res);
    //         this.setState({ persons: res.data})
    //     });
    // }
//render() {
        return(
            // <ul>
            //     {this.state.persons.map(person => <li key={person.id}>{person.name}</li>)}
            // </ul>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <h2>Data from API:</h2>
                        {data ? (
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                )}
            </div>
        )
    //}
}

export default PersonList