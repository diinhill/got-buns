import axios from 'axios'
import React, { createContext } from 'react'
import { ObjectID, RestaurantContextInterface } from '../@types'
import { getAuthHeader } from '../components/utils/Helper'

interface Props {

}

export const RestaurantContext = createContext<RestaurantContextInterface>({
    // user: null,    ????
    addRestaurant: () => {
        throw new Error('restaurant was not added')
    },
    getCurrentRestaurant: () => {
        throw new Error('could not get current restaurant data')
    },
    getAuthHeader: () => {
        throw new Error('no header yet')
    }
})


const RestaurantContextProvider = (props: { children: React.ReactNode }) => {

    const addRestaurant = async (form: HTMLFormElement) => {
        const restaurant = await axios.post('http://localhost:5000/api/restaurants/', form, { headers: getAuthHeader() })
        console.log('new restaurant:', restaurant.data)
        return restaurant.data
    }

    const getCurrentRestaurant = async (rid: ObjectID) => {
        const currentRestaurant = await axios.get(`http://localhost:5000/api/restaurants/${rid}`)
        console.log('current restaurant:', currentRestaurant.data)
        return currentRestaurant.data
    }

    return (

        <RestaurantContext.Provider value={{ addRestaurant, getCurrentRestaurant }}>
            {props.children}
        </RestaurantContext.Provider>
    )
}
export default RestaurantContextProvider
