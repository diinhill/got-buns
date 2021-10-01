import React, { createContext, useState } from 'react'


export const FooditemContext = createContext()


export const FooditemContextProvider = ({ children }) => {


    const getFooditems = async () => {
        const fooditems = await fetch(`/api/fooditems/all`)
        return fooditems.json()
        // do fetch from backend when fooditems collection is updated
    }

    // get fooditem from backend via the fooditem.id in its url
    const getFooditem = async (id) => {
        const fooditem = await fetch(`/api/fooditems/${id}`)
        return fooditem.json()
    }

    // const createNewFooditem = () => {
    //     const fooditem /* = ... */
    //     // function needs to be connected with router.post...addFooditem in fooditemRoute ?
    //     return fooditem
    // }




    return (

        <FooditemContext.Provider value={{ getFooditems, getFooditem, /*createNewFooditem*/ }}>
            {children}
        </FooditemContext.Provider>

    )
}