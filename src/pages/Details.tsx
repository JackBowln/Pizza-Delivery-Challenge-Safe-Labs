import {
    Button,
    Flex,
    Link,
    Stack,
    chakra,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPizzas, getResults } from "../services/Menu"
import { IOrderData, IPizzaData } from "../types/types"
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons"

const Details = (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [results, setResults] = useState<IOrderData>()

    let navigate = useNavigate()

    const orderItems = JSON.parse(localStorage.getItem("order") as string)

    const [cartItems, setCartItems] = useState<any>([])

    function buildMiniCart() {
        if (orderItems?.length > 0 || orderItems !== null) {
            const items = orderItems.map((obj: any) => ({
                ...obj,
                quantity: 1,
            }))
            const cart = items.reduce(
                (acc: any[], e: { name: any; quantity: any }) => {
                    const found = acc.find(
                        (x: { name: any }) => e.name === x.name
                    )

                    found ? (found.quantity += e.quantity) : acc.push(e)
                    return acc
                },
                []
            )
            setCartItems(cart)
        }
    }
    useEffect(() => {
        buildMiniCart()
    }, [])

    const total = `$${
        (orderItems?.reduce(
            (totalValue: any, value: any) => totalValue + value.price,
            0
        ) * 0.9).toFixed(2) || 0
    }`

    function finishPurchase() {
        localStorage.removeItem("order")
        buildMiniCart()
        // navigate("/")
    }
    useEffect(() => {
        const fetchResults = async () => {
            const resultsData = await getResults()
            setResults(resultsData.data)
        }
        fetchResults()
    }, [])
    if (cartItems?.length === 0 || cartItems === null) {
        return (
            <Box
                textAlign="center"
                py={200}
                px={6}
                h="600px"
                alignItems="center"
            >
                <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    Your cart is empty
                </Heading>
                <Text color={"gray.500"}>Add an item clicking here</Text>
                <Button as="a" href={"/"} my="20px">
                    BACK
                </Button>
            </Box>
        )
    }
    return (
        <Flex
            justifyContent={"center"}
            p={20}
            alignItems={"center"}
            flexWrap={"wrap"}
            gap="60px"
        >
            <Heading my={5} alignSelf={"start"} justifyContent={"start"}>
                Here is your checkout
            </Heading>
            <Flex
                direction={{ base: "column", lg: "row-reverse" }}
                minW={"300px"}
                w={{ base: "100%", lg: "40%" }}
                justifyContent="center"
                p={50}
                bg={useColorModeValue("gray.200", "gray.900")}
                borderRadius={10}
                flexDirection="column"
            >
                {cartItems && <Heading size="md">You choose:</Heading>}
                {cartItems &&
                    cartItems.map((item: IPizzaData, index: any) => (
                        <chakra.div key={index}>
                            <Heading py={10}>
                                {item.name} x {item.quantity}
                            </Heading>
                            <Text pb={"10px"} textTransform={"uppercase"}>
                                {item.ingredients.join(", ")}.
                            </Text>
                            <Flex >
                                {" "}
                                <chakra.h1
                                    fontWeight="regular"
                                    color="gray.400"
                                    fontSize="xl"
                                    as="s"
                                >
                                    ${item.price}
                                </chakra.h1>
                                <chakra.h1
                                    fontWeight="bold"
                                    fontSize="2xl"
                                    ml={5}
                                >
                                    ${0 || item.price * 0.9}
                                </chakra.h1>
                            </Flex>
                            <Divider mt={6}></Divider>
                        </chakra.div>
                    ))}
                <Flex
                    justifyContent={{ base: "end", "2xl": "center" }}
                    flexWrap={"wrap"}
                >
                    <Stack
                        direction={{
                            base: "column-reverse",
                            "2xl": "row-reverse",
                        }}
                        spacing={4}
                        mt={10}
                    >
                        <Button
                            alignSelf={"end"}
                            bg={useColorModeValue("green.500", "green.500")}
                            _hover={{ bg: "green.300" }}
                            px={50}
                            color={useColorModeValue("white", "black")}
                            fontWeight={"bold"}
                            onClick={() => {
                                onOpen()
                                finishPurchase()
                            }}
                        >
                            Finish purchase
                        </Button>
                        <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Order Confirmation</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Box
                                        textAlign="center"
                                        py={200}
                                        px={6}
                                        h="600px"
                                        alignItems="center"
                                    >
                                        {results?.success ? (
                                            <CheckCircleIcon
                                                boxSize={"50px"}
                                                color={"green.500"}
                                            />
                                        ) : (
                                            <WarningTwoIcon
                                                boxSize={"50px"}
                                                color={"orange.300"}
                                            />
                                        )}
                                        <Heading
                                            as="h2"
                                            size="xl"
                                            mt={6}
                                            mb={2}
                                        >
                                            Your order will be delivered in{" "}
                                            {(results?.deliveryTime as number) /
                                                60 /
                                                1000}{" "}
                                            minutes
                                        </Heading>

                                        <Button
                                            href={"/#main"}
                                            as={"a"}
                                            my="20px"
                                            _hover={{
                                                color: "gray.900",
                                                bg: "gray.400",
                                            }}
                                        >
                                            Order more
                                        </Button>
                                    </Box>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        onClick={() => {
                                            onClose()
                                            navigate("/")
                                        }}
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <Button
                            alignSelf={"end"}
                            as="a"
                            rounded={"full"}
                            px={50}
                            href="/#main"
                        >
                            Order more!
                        </Button>
                        <Text alignSelf={"end"} fontSize="30px">
                            Totals: {total}
                        </Text>
                    </Stack>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Details
