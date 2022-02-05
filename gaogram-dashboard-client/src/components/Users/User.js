import { Button, ButtonBase, Grid, Paper, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import './Users.css';



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '50%',
});


const User = (props) => {
    const{user,email,user_img} = props.user;
    return (
        <Paper sx={{ p: 2, margin: '2rem auto', maxWidth: 500, flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item>
                    <ButtonBase className="image-size">
                        <Img alt="complex" src={user_img} />
                    </ButtonBase>
                </Grid>
                <Grid item sm>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h5" component="div">
                                {user}
                            </Typography>
                        </Grid>
                        <Grid item xs >
                            <Typography variant="h7" gutterBottom>
                                {email}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Update">
                                <Button>
                                    <AiFillEdit size={24} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="delete">
                                <Button>
                                    <AiFillDelete size={24} style={{ "color": "red" }} />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default User;