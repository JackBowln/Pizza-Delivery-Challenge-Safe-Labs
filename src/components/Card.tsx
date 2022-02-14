import React from "react"
import { chakra, Box, Image, Flex, useColorModeValue } from "@chakra-ui/react"
import { Link } from "react-router-dom"

type CardProps = {
    name: String
    ingredients: String[]
    price: Number
}

const Card = (props: CardProps) => {
    function handleClick() {
        let items = JSON.parse(localStorage.getItem("order") as string)
        if (items == null) items = []
        const item = {
            name: props.name,
            price: props.price,
            ingredients: props.ingredients,
        }
        localStorage.setItem("item", JSON.stringify(item))
        items!.push(item)
        localStorage.setItem("order", JSON.stringify(items))
    }

    return (
        <Flex p={50}>
            <Box
                maxW="xs"
                mx="auto"
                bg={useColorModeValue("white", "gray.700")}
                shadow="lg"
                rounded="lg"
            >
                <Box px={4} py={2}>
                    <chakra.h1
                        color={useColorModeValue("gray.800", "white")}
                        fontWeight="bold"
                        fontSize="3xl"
                        textTransform="uppercase"
                    >
                        {props.name}
                    </chakra.h1>
                    <chakra.p
                        mt={1}
                        fontSize="sm"
                        color={useColorModeValue("gray.600", "gray.400")}
                    >
                        Ingredients: <br />
                        {props.ingredients.join(", ")}
                    </chakra.p>
                </Box>

                <Image
                    h={48}
                    w="full"
                    fit="cover"
                    mt={2}
                    src="src/assets/pizza-thumbnail.jpeg"
                    alt="Imagem ilustrativa pizza"
                />

                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    px={4}
                    py={2}
                    // bg="gray.900"
                    roundedBottom="lg"
                >
                    <Flex>
                        <chakra.h1
                            fontWeight="regular"
                            color="gray.400"
                            fontSize="md"
                            as="s"
                        >
                            ${props.price}
                        </chakra.h1>
                        <chakra.h1 fontWeight="bold" fontSize="xl   " ml={5}>
                            ${0 || props.price * 0.9}
                        </chakra.h1>
                    </Flex>
                    <Link to="/checkout">
                        <chakra.button
                            px={4}
                            py={2}
                            bg="red.400"
                            fontSize="xs"
                            color="white.900"
                            fontWeight="bold"
                            rounded="lg"
                            textTransform="uppercase"
                            _hover={{
                                bg: "red.300",
                                color: "white",
                            }}
                            onClick={() => {
                                handleClick()
                            }}
                        >
                            Add to cart
                        </chakra.button>
                    </Link>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Card
