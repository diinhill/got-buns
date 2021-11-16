import { PrivateIdentifier } from "typescript";

// users //
namespace AllUsers {
    interface User {
        _id: String
        name: string
        email: string
        profession?: string
        photo?: string
        restaurants: Restaurant[]
    }
    type AllUsers = User[]
}



// auth props //
interface LoginProps {
    email: string
    password: string
}



// restaurants and fooditems //
interface Restaurant {
    _id: String
    name: string
    phone: number
    street: string
    number: number
    postal: number
    town: string
    photo?: string
    comments?: Comment[]
    users?: User[]
    fooditems: Fooditem[]
    admin: User
}
interface Fooditem {
    _id: string
    name: string
    type: string
    amount: number
    price: number
    swapPossible: boolean
    photo?: string
}




// context //
interface AuthContextInterface {
    user: AllUsers.User | null
    login: (state: LoginProps) => any
    register: (state: FormData) => any
    getCurrentUser: () => any
    getAuthHeader: () => any
    logout: () => any
}
interface UserContextInterface {
    editUserProfile: (state: FormData) => any
    deleteUserProfile: () => any
    getAuthHeader: () => any
}
interface RestaurantContextInterface {
    addRestaurant: (state: FormData) => any
    editRestaurant: (state: FormData, rid: string) => any
    deleteRestaurant: (rid: string) => any
    getCurrentRestaurant: (rid: string) => any
    getAuthHeader: () => any
    deleteFooditem: (rid: string, fid: string) => any
    getCurrentFooditem: (rid: string, fid: string) => any
    editFooditem: (rid: string, fid: string) => any
}