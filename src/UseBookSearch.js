import React,{useState,useEffect} from 'react'
import axios from 'axios'

export const UseBookSearch = (query,pageNumber) => {
    const[books,setBooks]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(false)
    const[hasMore,setHasMore]=useState(false)

    useEffect(()=>{
        setBooks([])
    },[query])
 
     
 useEffect(()=>{
    let cancel;
    setLoading(true)
    axios({
        method:'GET',
        url:'http://openlibrary.org/search.json',
        params:{q:query,page:pageNumber},
        cancelToken:new axios.CancelToken(c=>cancel=c)
    }).then((res)=>{
        console.log(res.data.docs);
        setBooks(prevBooks=>{
            return [...new Set([...prevBooks,...res.data.docs.map((s)=>s.title)])]
        });
        setLoading(false);
        setHasMore(res.data.docs.length > 0)
        
    }).catch(er=>{
        if(axios.isCancel(er)) return
        setError(true);
    })
    return ()=>cancel();

    },[query,pageNumber])

  return{books, loading, error, hasMore}
}

export default UseBookSearch