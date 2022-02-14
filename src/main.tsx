import * as React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./styles/main.scss"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
}

const theme = extendTheme({ colors })
ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
