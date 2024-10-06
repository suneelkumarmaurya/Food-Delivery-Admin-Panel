import React from 'react'
import "./Add.css"
import {assets} from '../../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({url}) => {
    const [image , setImage] = useState(false)
   const [data,setData] = useState({
        name:"",
        description:"",
        category:"Salad",
        price:""
   })

   const onChangeHandler = (e)=>{
    const name=e.target.name
    const value=e.target.value
    setData({
        ...data,
        [name]:value
    })
   }

   const onSubmitHandler =async (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("price",Number(data.price))
    formData.append("image",image)
    const response= await axios.post(`${url}/api/food/addFood`,formData)

    if(response.data.success){
        setData({
            name:"",
            description:"",
            category:"Salad",
            price:"" 
       })
       setImage(false)
       toast.success(response.data.message)
   } else{
       console.log("Something went wrong")
       toast.error(response.data.message)
   }
}
   
// useEffect(()=>{
//     toast.success("Please upload an image")
// },[data])
  return (
    <div className="add">
        <form  className="flex-col" onSubmit={onSubmitHandler}> 
            <div className="add-img-upload flex-col">
                <p>Add Product Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" name="image" hidden required />
            </div>
            <div className="add-product-name flex-col"> 
                <p>Product Name</p>
                <input type="text" name="name" id="name" placeholder="Type here" value={data.name} onChange={onChangeHandler} required />
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea name="description" id="description"  rows="6" placeholder="Write content here" value={data.description} onChange={onChangeHandler} required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Category</p>
                    <select name="category" id="category"  onChange={onChangeHandler} value={data.category} required>
                        <option value="Salad" >Salad</option>
                        <option value="Rolls" >Rolls</option>
                        <option value="Deserts" >Deserts</option>
                        <option value="Sandwich" >Sandwich</option>
                        <option value="Cake" >Cake</option>
                        <option value="Pasta" >Pasta</option>
                        <option value="Noodles" >Noodles</option>
                        
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input type="number" name="price" id="price" placeholder="$20" onChange={onChangeHandler} value={data.price} required />
                </div>
            </div>
            <button type="submit" className="add-button">ADD</button>
        </form>
    </div>
  )
}

export default Add
