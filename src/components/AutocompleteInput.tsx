import React, { useState, useEffect } from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';



const AutocompleteInput = ({ onAddressSelect, reset, setReset }) => {
    const [country, setCountry] = useState('SG');
    const [type, setTypes] = useState('food');
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country },
            types: ["food", "restaurant", "point_of_interest"],
        },
        debounce: 300,
        cache: 86400,
    });

    

    useEffect(() => {
        const clearInput = () => {
            setValue('', false)
        }

        if (reset) {
            clearInput()
        }
    
      return () => {
        setReset(false)
      }
    }, [reset])
    
    //location: secondary_text
    //name: main_text
    const renderSuggestions = () => {
        console.log(data)
        return data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
              description,
            } = suggestion;
            console.log(suggestion)
            return (
                <li
                  className='hover:bg-gray-200 w-full cursor-pointer p-1 rounded-md'
                  key={place_id}
                  onClick={() => {
                    setValue(main_text, false);
                    clearSuggestions();
                    onAddressSelect && onAddressSelect(main_text, secondary_text);
                  }}
                >
                  <div className='flex flex-row justify-between items-center'>
                    <p className='font-semibold'>{main_text}</p>
                    <p className='text-xs'>{secondary_text}</p>
                  </div>
                </li>
            );
        });
    };


  return (
    <div className="h-full w-full relative">
      <input
        value={value}
        className="w-full p-2 rounded-lg appearance-none border-2 border-gray-200 !outline-none"
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Name"
      />

      {status === 'OK' && (
        <div className='absolute top-20 bg-white z-50 w-full border-2 rounded-xl p-2 shadow-md'>
          <ul className="w-full h-full">{renderSuggestions()}</ul>
        </div>
      )}

    </div>
  )
}

export default AutocompleteInput