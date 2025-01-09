//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import Home page
import Admin from './pages/Admin'; // Import Admin page
import Sponsor from './pages/Sponsor'; // Import Donation (Donator) page
import Applicant from './pages/Applicant'; // Import Receiver page

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} /> {/* Home page route */}
                    <Route path="/admin" element={<Admin />} /> {/* Admin page route */}
                    <Route path="/applicant" element={<Applicant />} /> {/* Receiver page route */}
                    <Route path="/sponsor" element={<Sponsor />} /> {/* Donator page route */}
                    

                </Routes>
            </div>
        </Router>
    );
};

export default App;
