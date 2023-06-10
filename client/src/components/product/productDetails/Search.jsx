import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    const [keyword,setKeyword] = useState("")
    const handleSearch = (e)=>{
        e.preventDefault()
        
        if(keyword.trim()){
            navigate(`/all/products/${keyword}`)

        }else{
            navigate("/all/products")

        }

    }
  return (
<>
<div style={{textAlign:"center"}}>
    <form onSubmit={handleSearch}>
    <input type="text" onChange={(e)=>setKeyword(e.target.value)} />
   <button type='submit'>submit</button>
   <hr></hr>
    </form>
   </div>
</>
  )
}

export default Search