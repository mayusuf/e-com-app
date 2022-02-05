import * as React from 'react';
import Link from '@mui/material/Link';
import Title from '../Title';
import { Box } from '@mui/system';
import './Users.css';
import User from './User';
import useUserData from '../../hooks/userData';



// Generate User Data



function preventDefault(event) {
    event.preventDefault();
}



export default function Users() {
    const users = useUserData({});
    
    return (
        <React.Fragment>
            <Title>Users List</Title>
            <Box className="users-list">
                {
                    users.map(user => <User user={user} />)
                }
            </Box>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}