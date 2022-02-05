import { useEffect, useState } from "react"
import axios from 'axios';


const useCategoriesData = () => {
    const [categories, setCategories] = useState([])
    // const [dataLoading, setDataLoading] = useState(true)
    useEffect(() => {
        // setDataLoading(true) 
        axios.get('http://localhost:3100/categories').then(res=> {
            setCategories(res.data);
        })
    }, [])
    return categories;
}
export default useCategoriesData;