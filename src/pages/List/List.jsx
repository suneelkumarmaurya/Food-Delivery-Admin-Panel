import React from 'react'
import "./List.css"
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
const List = ({ url }) => {
  const [list, setList] = useState([])
  const allFodd = async () => {

    const response = await axios.get(`${url}/api/food/listFood`)
    if (response.data.success) {
      setList(response.data.data)

    } else {
      console.log("Something went wrong")
      toast.error(response.data.message)
    }
  }
  const onClickRemoveHandler = async (id) => {
    const response = await axios.post(`${url}/api/food/removeFood/`, { id: id })
    if (response.data.success) {
      allFodd()
      toast.success(response.data.message)
    } else {
      console.log("Something went wrong")
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    allFodd()
  }, [])
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        <div >
          {
            list.map((item, index) => {
              return (
                <div className="list-table-format" key={index}>
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <p onClick={() => { onClickRemoveHandler(item._id) }} className="cursor">x</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default List
