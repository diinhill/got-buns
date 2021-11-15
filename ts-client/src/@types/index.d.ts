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
// interface EditUserProps {
//     name?: string
//     photo?: string
//     profession?: string
// }



// auth props //
interface LoginProps {
    email: string
    password: string
}
// interface RegisterProps {
//     email: string
//     password: string
//     name: string
//     photo?: string
//     profession?: string
// }



// restaurants //
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
// interface AddRestaurantProps {
//     name: string
//     street: string
//     number: string
//     postal: string
//     town: string
//     phone: string
//     photo?: string
// }
// interface EditRestaurantProps {
//     name?: string
//     street?: string
//     number?: string
//     postal?: string
//     town?: string
//     phone?: string
//     photo?: string
// }



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
}