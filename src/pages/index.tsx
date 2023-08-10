import React, { useMemo, useState } from "react"
import Dropdown from "@/components/Dropdown";
import MultipleDropdown from "@/components/MultipleDropdown";
import StarRating from "@/components/StarRating";
import Alert from "@/components/Alert";
import Success from "@/components/Success";
import AutocompleteInput from "@/components/AutocompleteInput";
import { useLoadScript } from "@react-google-maps/api";

const mapboxKey = process.env.NEXT_PUBLIC_MAPBOX_KEY

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedMood, setSelectedMood] = useState<{name:string}>({
    name: ""
  })
  const [selectedCuisine, setSelectedCuisine] = useState<{name:string}[] | []>([])
  const [selectedMealtime, setSelectedMealtime] = useState<{name:string}[] | []>([])
  const [rating, setRating] = useState<number | null>(0);
  const [name, setName] = useState('')
  const [location,setLocation] = useState('')
  const [budget, setBudget] = useState<number | ''>('')
  const [isChain, setIsChain] = useState(false)
  const [error, setError] = useState('')
  const [resetChild, setResetChild] = useState(false)

  const [success, setSuccess] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //submit for approval
    setLoading(true)
    if (!selectedMood || rating === 0 || !name || !budget || selectedCuisine.length === 0 || selectedMealtime.length === 0 ) {
      setError('All fields must be filled')
      return
    }

    let loc = isChain ? 'chain' : location

    let md = selectedMood.name.toLowerCase()
    let cuisines = selectedCuisine.map((obj:{name:string}) => obj.name.toLowerCase()).join(' ')
    let mealtimes = selectedMealtime.map((obj:{name:string}) => obj.name.toLowerCase()).join(' ')
    console.log(typeof budget)
    let bdgt = budget
    if (typeof budget != "number") {
      bdgt = parseInt(budget)
    }

    const form = {
      name: name,
      location: loc,
      budget: bdgt,
      mood: md,
      cuisine: cuisines,
      mealtime: mealtimes,
      rating: rating
    }
    console.log(form)
    let dev = process.env.NODE_ENV !== 'production';
    const url = `${dev ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL}/places`

    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await resp.json()

    if (resp.ok) {
      setSuccess(true)
      resetForm()
      setLoading(false)
    } else {
      setError(data.error)
      setLoading(false)
      return
    }
  }

  const resetForm = () => {
    setSelectedCuisine([])
    setSelectedMealtime([])
    setSelectedMood({name:""})
    setName('')
    setLocation('')
    setRating(0)
    setBudget('')
    setIsChain(false)
    setResetChild(true)
  }

  const closeError = () => {
    setError('')
  }

  const closeSuccess = () => {
    setSuccess(false)
  }

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.target as unknown as { value: number}
    setBudget(value)
  }

  const GOOGLEMAPSAPIKEY = process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY || ''
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLEMAPSAPIKEY
  }); 

  return (
    <main
      className="h-screen bg-gray-400 flex justify-center items-center"
    >
      {error && <Alert message={error} close={closeError}/>}
      {success && <Success close={closeSuccess}/>}
      <div className="flex flex-col items-center justify-center bg-white md:w-3/5 w-full h-full md:h-fit md:rounded-xl shadow-xl p-5">
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
        <h1 className="text-3xl font-bold text-center">Recommend a food place!</h1>
        
        <div className="flex flex-col gap-x-2 relative">
          <label className="ml-2 mb-1">Name of place<span className="ml-2 text-xs text-gray-500 font-semibold">Note: Singapore only</span></label>
          {isLoaded && <AutocompleteInput reset={resetChild} setReset={setResetChild} onAddressSelect={(name:string, address:string) => {
            setName(name)
            setLocation(address)
          }}/>}
          
        </div>
        <div className="flex-row flex items-center gap-x-2 -mt-2 ml-2">
          <input
            type="checkbox"
            checked={isChain}
            onChange={()=>setIsChain(!isChain)}
            className="scale-125"
          />
          <label>
            Check this if food place is a chain
          </label>
        </div>
        
        
        
        <Dropdown
          selected={selectedMood}
          setSelected={setSelectedMood}
          items={mood}
          name="mood"
          label="Mood"
          placeholder="What do you feel when you want this?"
        />

        <div className="flex flex-col gap-x-2">
          <label className="ml-2 mb-1">Estimated spending per pax</label>
          <input
            name="budget"
            type="number"
            value={budget}
            onChange={handleChange}
            placeholder="Cost"
            className="w-full p-2 rounded-lg appearance-none border-2 border-gray-200 !outline-none"
          />
          
        </div>

        <MultipleDropdown
          selected={selectedCuisine}
          setSelected={setSelectedCuisine}
          items={cuisine}
          name="cuisine"
          label="Cuisine type"
          placeholder="Select cuisines"
        />

        <MultipleDropdown
          selected={selectedMealtime}
          setSelected={setSelectedMealtime}
          items={mealtime}
          name="mealtime"
          label="Suited mealtimes"
          placeholder="Select mealtimes"
        />

        <div className="items-center flex w-full justify-center flex-col gap-y-2 mt-2">
          <label>Rating</label>
          <StarRating
            onChange={setRating}
            value={rating}
          />
        </div>
        


        <button 
          type="submit"
          className={`w-full text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FD5B61] hover:shadow-xl'} px-9 py-3 shadow-md rounded-lg
          font-bold mt-4 mb-2 `}
        >Submit</button>

        </form>
        
        
      </div>
    </main>
  )
}

const mood = [
  { id: 1, name: 'Healthy', unavailable: false },
  { id: 2, name: 'Comfort', unavailable: false },
  { id: 3, name: 'Energy', unavailable: false },
  { id: 4, name: 'Indulgent', unavailable: true },
]

const mealtime = [
  { id: 1, name: 'Brunch', unavailable: false },
  { id: 2, name: 'Lunch', unavailable: false },
  { id: 3, name: 'Dinner', unavailable: false },
  { id: 4, name: 'Snack', unavailable: true },
]

const cuisine = [
  { id: 1, name: 'Chinese', unavailable: false },
  { id: 2, name: 'Western', unavailable: false },
  { id: 3, name: 'Japanese', unavailable: false },
  { id: 4, name: 'Italian', unavailable: true },
  { id: 5, name: 'Korean', unavailable: false },
]