import React, { SetStateAction, useEffect, useState } from 'react'
import { Tab } from "@headlessui/react";
import AdminTable from '@/components/AdminTable'
import EditModal from '@/components/EditModal';

interface Item {
  id: number;
  name: string;
  budget: number;
  location: string;
  mood: string;
  cuisine: string;
  mealtime: string;
  rating: number;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const admin = () => {
  const tabs = ["Pending", "Approved"];
  const headers = ["id", "name", "budget", "location", "mood", "cuisine", "mealtime", "rating"]
  const [approved, setApproved] = useState<Item[]>([])
  const [requested, setRequested] = useState<Item[]>([])

  useEffect(()=>{
    const fetchDataApproved = async () => {
      let dev = process.env.NODE_ENV !== 'production';
      const url = `${dev ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL}/places/approved`
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (resp.ok) {
        const data = await resp.json()
        setApproved(data)
      }

    }

    const fetchDataRequested = async () => {
      let dev = process.env.NODE_ENV !== 'production';
      const url = `${dev ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL}/places/requested`
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (resp.ok) {
        const data = await resp.json()
        setRequested(data)
      }
    }

    fetchDataApproved()
    fetchDataRequested()
  },[])

  
  const deleteApproved = (id:number) => {
    const updated = approved.filter((obj:Item) => obj.id !== id)
    setApproved(updated)
  }

  const deleteRequested = (id:number) => {
    const updated = requested.filter((obj:Item) => obj.id !== id)
    setRequested(updated)
  }

  const approveId = (id:number) => {
    const obj = requested.find((obj:Item) => obj.id === id)

    if (obj) {
      const updated = requested.filter((obj:Item) => obj.id !== id)
      setRequested(updated)

      setApproved(approved.concat(obj))
    }
  }
  
  const editApproved = (id:number, item:Item) => {
    setApproved((prev:Item[]) => {
      return prev.map((obj:Item) => {
        if (obj.id === id) {
          return { ...obj, ...item};
        }
        return obj
      })
    })
  }

  const editRequested = (id:number, item:Item) => {
    setRequested(prev => {
      return prev.map(obj => {
        if (obj.id === id) {
          return { ...obj, ...item};
        }
        return obj
      })
    })
  }
  

  return (
    <div className='h-screen bg-white flex-col flex items-center w- py-4'>
      <div className='justify-center items-center'>
        <p className='text-center text-4xl font-bold'>Admin Dashboard</p>
        {/* <p>paginate both tables</p> */}
      </div>
      <div className="w-full px-2 py-4 sm:px-0 items-center flex flex-col">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 w-1/2 mb-4">
            {tabs.map((tab) => (
              <Tab key={tab}
                className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
              >{tab}</Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2 w-full px-10"
          >
            <Tab.Panel>
              <>
                {requested && <AdminTable items={requested} approved={false} headers={headers} deleteData={deleteRequested} approveItem={approveId} editItem={editRequested}/>}
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                {approved && <AdminTable items={approved} approved={true} headers={headers} deleteData={deleteApproved} approveItem={approveId} editItem={editApproved}/>}
              </>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default admin

const DUMMYREQUEST = [
  {
    "id":1,
    "name": "na1",
    "budget": 12,
    "location": "dsad",
    "mood":"dasd",
    "cuisine": "csai",
    "mealtime": "dasdsa",
    "rating": 2,
  },
  {
    "id":2,
    "name": "na2",
    "budget": 12,
    "location": "dsad",
    "mood":"dasd",
    "cuisine": "csai",
    "mealtime": "dasdsa",
    "rating": 2,
  },
  {
    "id":3,
    "name": "na3",
    "budget": 12,
    "location": "dsad",
    "mood":"dasd",
    "cuisine": "csai",
    "mealtime": "dasdsa",
    "rating": 2,
  },
  {
    "id":4,
    "name": "na4",
    "budget": 12,
    "location": "dsad",
    "mood":"dasd",
    "cuisine": "csai",
    "mealtime": "dasdsa",
    "rating": 2,
  },
  {
    "id":5,
    "name": "na5",
    "budget": 12,
    "location": "dsad",
    "mood":"dasd",
    "cuisine": "csai",
    "mealtime": "dasdsa",
    "rating": 2,
  },
]

const DUMMYAPPROVED = [
  {
    "id":10,
    "name": "na10",
    "budget": 12,
    "location": "dsad",
    "mood":"dasd",
    "cuisine": "csai",
    "mealtime": "dasdsa",
    "rating": 2,
  },
  {
    "id":20,
    "name": "na20",
    "budget": 12,
    "location": "dsad",
    "mood":"dasd",
    "cuisine": "csai",
    "mealtime": "dasdsa",
    "rating": 2,
  },
  {
    "id":30,
    "name": "na30",
    "budget": 120,
    "location": "dsad",
    "mood":"dasd",
    "cuisine": "csai",
    "mealtime": "dasdsa",
    "rating": 2,
  },
  {
    "id":40,
    "name": "na40",
    "budget": 120,
    "location": "dsa0d",
    "mood":"das0d",
    "cuisine": "csa0i",
    "mealtime": "das0dsa",
    "rating": 2,
  },
  {
    "id":50,
    "name": "na50",
    "budget": 120,
    "location": "dsad",
    "mood":"dasd",
    "cuisine": "csai",
    "mealtime": "dasdsa",
    "rating": 2,
  },
]