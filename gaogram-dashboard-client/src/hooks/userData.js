import { useEffect, useState } from "react"
import axios from 'axios';


const useUserData = () => {
    const [users, setUsers] = useState([])
    // const [dataLoading, setDataLoading] = useState(true)
    useEffect(() => {
        // setDataLoading(true) 
        axios.get('http://localhost:3100/users').then(res=> {
            setUsers(res.data);
        })
    }, [])
    return users;
}
export default useUserData;