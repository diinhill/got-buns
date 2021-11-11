import { PrivateIdentifier } from "typescript";

namespace AllUsers {
    interface User {
        name: string
        _id: String
        profession?: string
        photo?: string
        restaurants: Restaurant[]
    }
    type AllUsers = User[]
}
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
    fooditems?: Fooditem[]
    admin: User
}


// auth props 
interface LoginProps {
    email: string
    password: string
}
interface RegisterProps {
    email: string
    password: string
    name: string
    photo?: string
    profession?: string
}

interface RestaurantProps {
    name: string
    street: string
    number: string
    postal: string
    town: string
    phone: string
    photo?: string
}



// context //
interface AuthContextInterface {
    user: AllUsers.User | null
    login: any
    register: any
    getCurrentUser: any
    getAuthHeader: any
    logout: any
}
interface RestaurantContextInterface {
    addRestaurant: /* (state: RestaurantProps) => */ any;
    getCurrentRestaurant: (rid: string) => any;
    getAuthHeader?: () => any;

}