import axios from 'axios'
import React, { createContext, useContext } from 'react'
import { RestaurantContextInterface } from '../@types'
import { getAuthHeader } from '../components/utils/Helper'
import { AuthContext } from './AuthContext'



export const RestaurantContext = createContext<RestaurantContextInterface>({
    addRestaurant: (state: FormData) => {
        throw new Error('restaurant was not added')
    },
    editRestaurant: (state: FormData, rid: string) => {
        throw new Error('restaurant could not be updated')
    },
    deleteRestaurant: (rid: string) => {
        throw new Error('restaurant could not be deleted')
    },
    getCurrentRestaurant: (rid: string) => {
        throw new Error('could not get current restaurant data')
    },
    getAuthHeader: () => {
        throw new Error('no header yet')
    }
})


const RestaurantContextProvider = (props: { children: React.ReactNode }) => {

    const { getCurrentUser } = useContext(AuthContext)

    const addRestaurant = async (state: FormData) => {
        const restaurant = await axios.post('http://localhost:5000/api/restaurants/', state, { headers: getAuthHeader() })
        console.log('new restaurant:', restaurant.data)
        getCurrentUser()
        return restaurant.data
    }

    const editRestaurant = async (state: FormData, rid: string) => {
        const updatedRestaurant = await axios.patch(`http://localhost:5000/api/restaurants/${rid}`, state, { headers: getAuthHeader() })
        console.log('updatedRestaurant:', updatedRestaurant.data)
        getCurrentUser()
        return updatedRestaurant.data
    }

    const deleteRestaurant = async (rid: string) => {
        const restaurant = await axios.delete(`http://localhost:5000/api/restaurants/${rid}`, { headers: getAuthHeader() })
        console.log('restaurant:', restaurant.data)
        getCurrentUser()
    }

    const getCurrentRestaurant = async (rid: string) => {
        const currentRestaurant = await axios.get(`http://localhost:5000/api/restaurants/${rid}`)
        console.log('current restaurant:', currentRestaurant.data)
        return currentRestaurant.data
    }

    return (

        <RestaurantContext.Provider value={{ addRestaurant, editRestaurant, deleteRestaurant, getCurrentRestaurant, getAuthHeader }}>
            {props.children}
        </RestaurantContext.Provider>
    )
}
export default RestaurantContextProvider
