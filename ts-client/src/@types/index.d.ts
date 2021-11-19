import { PrivateIdentifier } from "typescript"

// users //
namespace AllUsers {
    interface User {
        _id: String
        name: string
        email: string
        password: string
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

export enum RestaurantTypes {
    'Buffet', 'Café', 'Bars and Pubs', 'Fastfood', 'Family-style', 'Fine dining', 'Casual'
}
export enum CuisineTypes {
    'American', 'Indian', 'Chinese', 'Greek', 'Turkish', 'Israeli', 'Japanese', 'Italian', 'Mexican',
    'Thai', 'Vietnamese', 'Libanese', 'Sudanese', 'Spanish', 'Austrian', 'French', 'Bavarian', 'Croatian',
    'Argentinian', 'Georgian', 'Vegan/Vegetarian', 'Continental'
}
interface Restaurant {
    _id: string
    name: string
    type?: string
    cuisineType?: string
    phone: string
    street: string
    number: string
    postal: string
    town: string
    photo?: string
    comments?: Comment[]
    users?: User[]
    fooditems: Fooditem[]
    admin: User
}

export enum FooditemTypes {
    'Vegetables', 'Fruits', 'Breads', 'Dairy Products', 'Meat'
}
interface Fooditem {
    _id: string
    name: string
    restaurantID: string
    type?: string
    amount: string | number
    price: string
    swapPossible?: string | boolean
    reserved?: boolean | string
    photo?: string
    updated?: Date | string
    purchaseDate?: Date | string
    dueDate?: Date | string
}





// context //
interface AuthContextInterface {
    user: AllUsers.User | null
    login: (state: LoginProps) => void
    register: (state: FormData) => void
    getCurrentUser: () => any
    getAuthHeader: () => void
    logout: () => any
}
interface UserContextInterface {
    editUserProfile: (state: FormData) => any
    deleteUserProfile: () => any
    getAuthHeader: () => void
}
interface RestaurantContextInterface {
    getAllRestaurants: () => any
    getCurrentRestaurant: (rid: string) => any
    addRestaurant: (state: FormData) => any
    editRestaurant: (state: FormData, rid: string) => any
    deleteRestaurant: (rid: string) => any
    editFooditem: (rid: string, fid: string) => any
    addFooditem: (formData: FormData, rid: string) => any
    getCurrentFooditem: (rid: string, fid: string) => any
    deleteFooditem: (rid: string, fid: string) => any
    getAuthHeader: () => void
}