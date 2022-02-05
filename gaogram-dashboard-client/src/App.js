import React from 'react';
import './App.css';
import Users from './pages/Users/Users';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemsPage from './pages/Items/ItemsPage';
import Login from './pages/Login/Login'
import Category from './pages/Category/Category';
import AddUser from './components/Users/AddUser';
import AddCategory from './pages/Category/AddCategory';
import UpdateCategory from './pages/Category/UpdateCategory';
import AddItem from './pages/Items/AddItem';
import UpdateItem from './pages/Items/UpdateItem';
import AuthProvider from './components/AuthProvider/AuthProvider';
// import PrivateRoute from './components/PrivateRoute.js/PrivateRoute';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/user/add" element={<AddUser />} />
            <Route exact path="/category" element={<Category />} />
            <Route exact path="/category/update/:id" element={<UpdateCategory />} />
            <Route exact path="/category/add" element={<AddCategory />} />
            <Route exact path="/items" element={<ItemsPage />} />
            <Route exact path="/item/add" element={<AddItem />} />
            <Route exact path="/item/update/:id" element={<UpdateItem />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
