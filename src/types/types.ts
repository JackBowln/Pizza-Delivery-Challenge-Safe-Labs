export interface IPizzaData extends Array<IPizzaData>{
    name: String
    price: Number
    ingredients: String[]
}

export interface IOrderData {
    success: Boolean,
    deliveryTime?: Number
}
