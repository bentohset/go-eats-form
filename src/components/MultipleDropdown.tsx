import React, { Dispatch, Fragment, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { stringify } from 'querystring';

const MultipleDropdown = ({ selected, setSelected, items, name, label, placeholder}: {selected:{name:string}[], setSelected:(value:{name:string}[])=>void, items: { id: number; name: string; unavailable: boolean; }[], name: string, label: string, placeholder:string}) => {
  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected} name={name} multiple>
        <Listbox.Label className="ml-2">{label}</Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border-2 border-gray-200 bg-white py-2 pl-3 pr-10 text-left appearance-none !outline-none sm:text-sm">
            {(selected.length > 0 && selected[0].name !== "") ? selected.map((item:{name:string})=>item.name).join(', ') : <span className='text-gray-400 font-medium text-base'>{placeholder}</span>}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-50 border-2 border-gray-200 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item:{name:string}, itemIdx:number) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default MultipleDropdown