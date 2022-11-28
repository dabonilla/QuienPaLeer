import React, { useState, useEffect } from 'react'

const DatePublication = ({dateCreatedAt})=>{
    const [datePublication, setDatePublication] = useState(" ")
    useEffect(() => {
        const date = new Date(dateCreatedAt)
        const str = date.toLocaleDateString()+" "+date.toLocaleTimeString()
   //     console.log(str)
        setDatePublication(str)
    });
    return <p>Fecha de publicación: {datePublication}</p>
}
export default DatePublication