import Api from "../plugins/axios"
import { IOrderData, IPizzaData } from "../types/types"

const getPizzas = async () => {
    const response = await Api.get<IPizzaData>("/pizzas.json")

    return response
}

const getResults = async () => {
    const response = await Api.get<IOrderData>("/order.json")

    return response
}


export { getPizzas, getResults }
