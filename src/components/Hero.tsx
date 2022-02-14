import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from "@chakra-ui/react"

export default function SplitScreen() {
    return (
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
                <Stack spacing={6} w={"full"} maxW={"lg"}>
                    <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                        <Text
                            as={"span"}
                            position={"relative"}
                            _after={{
                                content: "''",
                                width: "full",
                                height: useBreakpointValue({
                                    base: "20%",
                                    md: "30%",
                                }),
                                position: "absolute",
                                bottom: 1,
                                left: 0,
                                bg: "red.400",
                                zIndex: -1,
                            }}
                        >
                            Pizza Planet
                        </Text>
                        <br />{" "}
                        <Text color={"red.400"} as={"span"}>
                            Pizza Delivery
                        </Text>{" "}
                    </Heading>
                    <Text
                        fontSize={{ base: "md", lg: "lg" }}
                        color={"gray.500"}
                    >
                        We believe authentic Italian cuisine is something
                        special. By honouring traditional Neapolitan techniques,
                        we bring the taste of Naples to our customers – along
                        with the world’s best pizza!
                    </Text>
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        spacing={4}
                    >
                        <Button
                            href={"#main"}
                            as={"a"}
                            rounded={"full"}
                            bg={"red.400"}
                            color={"white"}
                            _hover={{
                                bg: "red.500",
                                color: "black",
                            }}
                        >
                            Order it!
                        </Button>
                        <Button
                            href={"#main"}
                            as={"a"}
                            bg={useColorModeValue("white", "gray.800")}
                            rounded={"full"}
                            _hover={{
                                color: "white",
                            }}
                        >
                            Menu
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={"Login Image"}
                    objectFit={"cover"}
                    src={"src/assets/pizza-banner.jpeg"}
                />
            </Flex>
        </Stack>
    )
}
