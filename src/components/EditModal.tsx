import React, { useState, Fragment, ChangeEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'

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

type Props = {
  handleSubmitEdit: (event: {    preventDefault: () => void;}) => Promise<void>;
  isOpen: boolean;
  closeModal: () => void;
  item: Item;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const EditModal = (props: Props) => {

  return (

    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-10"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-10"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all">
                <form onSubmit={props.handleSubmitEdit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* Modal header  */}
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Edit
                    </h3>
                    <button type="button" onClick={props.closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-8 gap-6">
                      <div className="col-span-2 sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                        <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={props.item.id}
                          name="id"
                          disabled
                          onChange={props.handleInputChange}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={props.item.name}
                          name="name"
                          onChange={props.handleInputChange}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Budget</label>
                        <input type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={props.item.budget}
                          name="budget"
                          onChange={props.handleInputChange}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mood</label>
                        <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={props.item.mood}
                          name="mood"
                          onChange={props.handleInputChange}
                        />
                      </div>
                      <div className="col-span-8 sm:col-span-8">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                        <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={props.item.location}
                          name="location"
                          onChange={props.handleInputChange}
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cuisine</label>
                        <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={props.item.cuisine}
                          name="cuisine"
                          onChange={props.handleInputChange}
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mealtime</label>
                        <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={props.item.mealtime}
                          name="mealtime"
                          onChange={props.handleInputChange}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                        <input type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={props.item.rating}
                          name="rating"
                          onChange={props.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/*  Modal footer  */}
                  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditModal