import React,{useState,useEffect, Fragment,useRef,useCallback} from 'react'

import UseBookSearch from './UseBookSearch'

const App = () => {
  const[query,setQuery]=useState('');
  const[pageNumber,setPageNumber]=useState(1);
  const{books,loading,error,hasMore}=UseBookSearch(query,pageNumber);

  const observer=useRef()
  
  const lastBookElementRef = useCallback(node=>{
    if(loading) return
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting && hasMore)
        {
            setPageNumber(prevPageNumber=>prevPageNumber+1)
            console.log(pageNumber)
        }
    })
    if(node) observer.current.observe(node);

   
},[loading,hasMore])



  const handleSearch=(e)=>{
    setQuery(e.target.value);
    setPageNumber(1);
 }

 useEffect(()=>{

 },[books,loading,hasMore])

  return (
    <div className='continer'>
      <h1>Book Search Infinite Scrolling</h1>
      <div className='continer'>
      <input type='text' value={query} onChange={handleSearch}/> 
     
      {error && <div>Error occure Please try again</div>}

      {books && books.map((book,index)=>{
         if(books.length === index+1)
         {
          return <div ref={lastBookElementRef} key={index}>{book}</div>
         }
         else{
         return <div key={index}>{book}</div> 
         }
          
        })}
         {loading && <h2>Loading...</h2>}
      </div>
    </div>
  )
}

export default App