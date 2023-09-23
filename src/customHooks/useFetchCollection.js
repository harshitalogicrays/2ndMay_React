import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { toast } from 'react-toastify'

const useFetchCollection = (collectionname) => {
    let [data,setData]=useState([])
    let [isLoading,setIsLoading]=useState(false)

    useEffect(()=>{
        getcollection()
    },[])

    let getcollection=()=>{
        setIsLoading(true)
        try{
            const docRef=collection(db,collectionname)
            const q=query(docRef,orderBy("createdAt","desc"))
            onSnapshot(q,(snapshot)=>{
             const allData = snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
             setData(allData)
             setIsLoading(false)
            })
            
        }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }
    }
  return (
    {data,isLoading}
  )
}

export default useFetchCollection
