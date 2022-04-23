import React from 'react'
import {useState,useEffect} from 'react';
import Form from './Form';
import Loader from './loader';


export default function ItemsData(props) {
   
    const [backendData,setBackendData] = useState();

    useEffect(()=>{
      fetch('/myapi').then(
        response=>response.json()
      ).then(
        data=>{
          setBackendData(data)
          console.log(data);
        }
      )
    },[])

    const addToList = (productName,categoryName,subCategoryName) => {
       
      fetch('/myapi', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
              name: productName,
              category: categoryName,
              subcategory: subCategoryName
          })
      }).then((res) => {
          setBackendData([
              ...backendData,
                  {
              name: productName,
              category: categoryName,
              subcategory: subCategoryName
          }
          ])
      }).catch((err) => {
          console.log(err)
      });

      
    } 

    const generateHTML = () => {
        if(!backendData){
          return <Loader/>

        }
        
        var html = Object.keys(backendData).map((item,index) => (
    
        <div className="container" key={index} >
        <table className="table" >
           
            <tbody >
                <tr >
                    <th className=" col-2"  scope="row">{index + 1}</th>
                    <td className="col-4" >
                    {backendData[item].name}
                    </td>
                    <td className="col-3" >
                    {backendData[item].subcategory}
                    </td >
                    <td className="col-3">
                    {backendData[item].category}
                    </td>
                   
                </tr>
            </tbody>
         
        </table>
        </div>
    
        ))
        return html;
        } 
  return (
    <div>
       <div className='container'>
    {/* <button type="button" onClick={()=>props.onClick} className="my-3 btn btn-primary btn-lg">Add</button>     */}
        <h1 className='mb-2'>All Products</h1>
    <table className='table  border border-dark'>        
        <thead className="thead-dark text-center">
            <tr>
            <th scope="col" className=" col-2">S.No</th>
                <th scope="col" className=" col-4">Product</th>
                <th scope="col" className=" col-3">SubCategory</th>
                <th scope="col" className=" col-3">Category</th>
            </tr>
        </thead>
    </table>
    </div>
    <div className='text-center border border-dark mb-3 ms-5 me-5'>
    {
        generateHTML()
    }
    </div>
    {
      props.isClicked &&

    <Form 
    addToList={addToList}
    disabled={props.disabled}
    />
    }
    </div>
  )
}
