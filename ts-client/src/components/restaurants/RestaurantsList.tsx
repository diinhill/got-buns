import React, { useContext } from "react"
import { useHistory } from "react-router"
import { Restaurant } from "../../@types"
import { AuthContext } from "../../context/AuthContext"
import RestaurantCard from "./RestaurantCard"

// core components

interface Props {
  allRestaurants: Restaurant[]
}


const RestaurantsList: React.FC<Props | any> = ({ allRestaurants }) => {

  const history = useHistory()
  const { user } = useContext(AuthContext)
  console.log(`allRestaurants:`, allRestaurants)

  return (
    allRestaurants &&
    allRestaurants.map((resta: Restaurant, i: React.Key | null | undefined) =>

      <RestaurantCard restaurant={resta} />

    )

  )
}

export default RestaurantsList
