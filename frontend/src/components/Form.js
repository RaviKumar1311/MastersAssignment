import { useState,useEffect} from "react";


export default function Form(props) {

    const [categoryData,setCategoryData] = useState([]);
    const [subCategoryData,setSubCategoryData] = useState([]);
    const [productName,setProductName] = useState("");
    const [categoryName,setCategoryName]=useState("");
    const [subCategoryName,setSubCategoryName] =useState("");

    useEffect(()=>{
      fetch('/categories').then(
        response=>response.json()
      ).then(
        data=>{
        let temp = data[0].categories;
          setCategoryData(temp)
          console.log(temp);
        }
      )

      fetch('/subcategories').then(
        response=>response.json()
      ).then(
        data=>{
        let   temp1 = data[0].Electronics;
        let temp2 = data[0].Sports;
        let temp3 = [...temp1,...temp2]
          setSubCategoryData(temp3);
        }
      )
    },[])

    return (
        <section className="container mb-5">
            <div className="row">
                <div className="form-group col-3">
                    <input
                        type="text"
                        className= "form-control"
                        placeholder = "Enter Product Name"
                        onChange={(e) => {
                            setProductName(e.target.value)
                        }}
                    />
                </div>

                <div className="col-3">
                   
                   <select className="form-control" 
                   onChange={(event) => 
                       setCategoryName(event.target.value)

                   
                       }
                    >
                   <option  value={"Laptop"}>Choose Category...</option>
                    {categoryData.map((value, index) => <option key={index} value={value} >{value}</option>)}
                   </select>
               </div>

                <div className="col-3">
                    
                    <select className="form-control"  onChange={(event) => setSubCategoryName(event.target.value)}>
                    <option  value={"Laptop"}>Choose SubCategory...</option>
                    {subCategoryData.map(( value, index) => <option key={index} value={value} >{value}</option>)}
 
                    {/* <option value={subCategoryData[0]}>{subCategoryData[0]}</option>
                    <option value={subCategoryData[1]}>{subCategoryData[1]}</option>
                    <option value={subCategoryData[2]}>{subCategoryData[2]}</option>
                    <option value={subCategoryData[3]}>{subCategoryData[3]}</option>
                        
                    
                    
                    <option value={subCategoryData[4]}>{subCategoryData[4]}</option>
                    <option value={subCategoryData[5]}>{subCategoryData[5]}</option>
                    <option value={subCategoryData[6]}>{subCategoryData[6]}</option>
                    <option value={subCategoryData[7]}>{subCategoryData[7]}</option> */}
 

                    </select>
                </div>
                

              
                <div className="col-3">
                    <button className="btn btn-primary float-left"
                        onClick={()=>{

                            console.log(productName,categoryName,subCategoryName)
                            props.addToList(productName,categoryName,subCategoryName);
                            setProductName("");
                            setCategoryName("Category..")
                            setSubCategoryName("SubCategory..");
                            props.disabled();
                        }}          
                    >ADD Product</button>
                </div>

            </div> 
        </section>
    )
}