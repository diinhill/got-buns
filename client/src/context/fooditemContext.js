import React, { createContext, useState } from 'react'


export const FooditemContext = createContext()


export const FooditemContextProvider = ({ children }) => {

    const [fooditems, setNewFooditems] = useState([])


    const getFooditems = async () => {
        // do fetch from backend when fooditems collection is updated
    }
    const getFooditem = async () => {
        const fooditem /* = ... */
        // get fooditem from backend via the fooditem.id in its url
        return fooditem
    }

    const createNewFooditem = () => {
        const fooditem /* = ... */
        // function needs to be connected with router.post...addFooditem in fooditemRoute ?
        return fooditem
    }




    return (

        <FooditemContext.Provider value={{ fooditems, getFooditems, getFooditem, createNewFooditem }}>
            {children}
        </FooditemContext.Provider>

    )
}