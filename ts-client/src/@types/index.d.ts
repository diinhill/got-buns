import { PrivateIdentifier } from "typescript";

namespace AllUsers {
    interface User {
        name: string
        _id: ObjectID
        profession?: string
        photo?: string
        restaurants?: Restaurant[]
    }
    type AllUsers = User[]
}

interface LoginProps {
    email: string
    password: string
}

interface Restaurant {
    _id: ObjectID
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



// context //
interface AuthContextInterface {
    user: AllUsers.User | null
    login: any
    getCurrentUser: any
    getAuthHeader: any
}

interface RestaurantContextInterface {

}





class ObjectID {
    _id: string
    constructor(public readonly _id) {
        this._id = _id
    }
}

// Arguments:
// id(string) – Can be a 24 byte hex string, 12 byte binary string or a Number.
//     Returns:	
// object instance of ObjectID.