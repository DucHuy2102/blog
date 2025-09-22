import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.component';
import UserAuthForm from './pages/userAuthForm.page';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navbar />}>
                <Route path='signin' element={<UserAuthForm type='sign-in' />} />
                <Route path='signup' element={<UserAuthForm type='sign-up' />} />
                <Route
                    path='/'
                    element={
                        <h1 className='mt-24 text-4xl text-center capitalize font-gelasio'>
                            Home Page
                        </h1>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;
