import { ReactNode, useEffect, useState } from "react"
import logo from "../assets/logo.png"
import {
    Box,
    Flex,
    Link,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Image,
    Heading,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon, WarningTwoIcon } from "@chakra-ui/icons"

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={"#"}
    >
        {children}
    </Link>
)

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <header id="header">
                <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                    <Flex
                        h={16}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Box>
                            <Link href="/">
                                <Image
                                    src={logo}
                                    fallbackSrc="https://via.placeholder.com/60"
                                ></Image>
                            </Link>
                        </Box>

                        <Flex alignItems={"center"}>
                            <Stack direction={"row"} spacing={7}>
                                <Button onClick={toggleColorMode}>
                                    {colorMode === "light" ? (
                                        <MoonIcon />
                                    ) : (
                                        <SunIcon />
                                    )}
                                </Button>
                            </Stack>
                        </Flex>
                    </Flex>
                </Box>
            </header>
        </>
    )
}
