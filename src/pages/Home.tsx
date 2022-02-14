import { Flex, useColorModeValue, chakra } from "@chakra-ui/react"
import React, { useState, useEffect, Key } from "react"
import Card from "../components/Card"

import Hero from "../components/Hero"
import { Link } from "react-router-dom"
import { getPizzas } from "../services/Menu"
import { IPizzaData } from "../types/types"
const Home = () => {
    const [pizzas, setPizzas] = useState<IPizzaData | null>(null)

    useEffect(() => {
        const fetchPizzaData = async () => {
            const pizzaData = await getPizzas()
            console.log(pizzaData.data)
            setPizzas(pizzaData.data)
        }
        fetchPizzaData()
    }, [])

    return (
        <>
            <Hero></Hero>
            <chakra.div id="main">
                <Flex
                    wrap={"wrap"}
                    maxW="1440px"
                    flex={1}
                    marginInline={'auto'}
                    bg={useColorModeValue("#F9FAFB", "gray.800")}    
                    justifyContent="space-evenly"
                >
                    {pizzas &&
                        pizzas.map((pizza: IPizzaData) => (
                            <Card key={pizza.name as Key}
                                name={pizza.name}
                                ingredients={pizza.ingredients}
                                price={pizza.price}

                            />
                        ))}
                </Flex>
            </chakra.div>
        </>
    )
}

export default Home
