import Home from "./Home";
import Details from "./Details";
import {Route, Routes, BrowserRouter} from 'react-router-dom';

export default function Pages(){
    return (
        <Routes>
            <Route path="/recipes" element={<Home />} />
            <Route path="/recipes/:id" element={<Details />} />
        </Routes>
    );
}