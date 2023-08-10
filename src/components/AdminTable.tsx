import React, { useState } from 'react'
import EditModal from './EditModal';
import { useRouter } from 'next/router'

interface Item {
    id: number;
    name: string;
    budget: number;
    location: string;
    mood: string;
    cuisine: string;
    mealtime: string;
    rating: number;
    [key: string]: any;
}

interface Props {
    items: Item[]
}

const AdminTable = ({ items, approved, headers, deleteData, approveItem, editItem }:{items:Item[], approved:boolean, headers:string[], deleteData: (id:number)=>void, approveItem:(id:number)=>void, editItem:(id:number, item: Item)=>void}) => {
    //edit button pops up modal to edit
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [item, setItem] = useState({
        id: 0,
        name: '',
        budget: 0,
        location: '',
        mood: '',
        cuisine: '',
        mealtime: '',
        rating: 0,
    })

    const handleEdit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        let dev = process.env.NODE_ENV !== 'production';
        const url = `${dev ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL}/places/${item.id}`
        console.log(url)
        const resp = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json()
        
        if (resp.ok) {
            closeModal()
            editItem(item.id, item)
        }
    }

    const handleDelete = async (event: { preventDefault: () => void; }, id: number) => {
        event.preventDefault()
        let dev = process.env.NODE_ENV !== 'production';
        const url = `${dev ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL}/places/${id}`
        console.log(url)
        const resp = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json()
        
        if (resp.ok) {
            deleteData(id)
        }
    }

    const handleApprove = async (event:{ preventDefault: () => void; }, id: number) => {
        event.preventDefault()
        let dev = process.env.NODE_ENV !== 'production';
        const url = `${dev ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL}/places/${id}/approve`
        console.log(url)
        const resp = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json()
        
        if (resp.ok) {
            approveItem(id)
        }
    }

    const openModal = (item:Item) => {
      setItem(item)
      setShowModal(true)
      console.log("open")
    }
  
    const closeModal = () => {
      setShowModal(false)
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    }





  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                    {headers.map(header=>(
                        <th key={header} scope="col" className="px-3 py-3">
                        {header}
                        </th>
                    ))}
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, idx)=>(
                    <tr key={item.id} className="bg-white border-b ">
                        {headers.map(header=>(
                            <td key={header} className="px-6 py-4">
                                {item[header]}
                            </td>
                        ))}
                        <td className="px-6 py-4 gap-x-2 flex flex-row justify-center">
                            <button onClick={()=>{openModal(item)}} className="font-medium text-blue-600  hover:underline">Edit</button>
                            <button onClick={()=>{handleDelete(event, item.id)}} className="font-medium text-blue-600  hover:underline">Delete</button>
                            {!approved &&
                            <button onClick={()=>{handleApprove(event, item.id)}} className="font-medium text-blue-600  hover:underline">Approve</button>
                            }
                        </td>
                    </tr>
                    
                ))}
            </tbody>
        </table>
        <EditModal isOpen={showModal} handleSubmitEdit={handleEdit} closeModal={closeModal} item={item} handleInputChange={handleInputChange}/>
    </div>

  )
}

export default AdminTable;