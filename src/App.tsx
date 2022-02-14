import Header from "./components/Header"
import Footer from "./components/Footer"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Home from "./pages/Home"
import Details from "./pages/Details"

const App = () => {
    return (
        <>
            <Header></Header>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/checkout" element={<Details />} />
                </Routes>
            </Router>
            <Footer></Footer>
        </>
    )
}

export default App
