import { useEffect, useState } from "react"
import axios from 'axios';


const useItemData = () => {
    const [items, setItems] = useState([])
    // const [dataLoading, setDataLoading] = useState(true)
    useEffect(() => {
        // setDataLoading(true) 
        axios.get('http://localhost:3100/items').then(res=> {
                setItems(res.data);
            })
    }, [])
    return items;
}
export default useItemData;