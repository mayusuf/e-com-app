import React from 'react';
import './ItemList.css'
import { AiFillEdit, AiFillDelete, BiDetail } from 'react-icons/all';
import { Button, ButtonBase, Card, styled, Grid, Rating, Tooltip, Typography, Modal, Fade, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Img = styled('img')({
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: '10%',
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Item = (props) => {
    const { item_id, item_name, item_img, item_price, in_stock } = props.item;
    const navigate = useNavigate();

    const handleDelete = id => {
        const url = `http://localhost:3100/item/delete/${id}`;
        axios.delete(url)
            .then(res => {
                if (res.data.affectedRows === 1) {
                    navigate(0);
                }
            })
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Card className="card">
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", padding: "1rem" }}>
                <Grid item>
                    <ButtonBase className="image-size">
                        <Img alt="complex" src={item_img} />
                    </ButtonBase>
                </Grid>
                <Grid item sm>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h5" component="div">
                                {item_name}
                            </Typography>
                        </Grid>
                        <Grid item xs >
                            <Typography variant="h7" gutterBottom>
                                {"Price: " + item_price}
                            </Typography>
                        </Grid>
                        <Grid item xs >
                            <Typography variant="h7" gutterBottom>
                                {"In Stock: " + in_stock}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Details">
                                <Button>
                                    <BiDetail size={24} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Update">
                                <Button component={Link} to={`/item/update/${item_id}`}>
                                    <AiFillEdit size={24} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="delete">
                                <Button onClick={handleOpen}>
                                    <AiFillDelete size={24} style={{ "color": "red" }} />
                                </Button>
                            </Tooltip>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Do you want to DELETE this item?"}</DialogTitle>
                                <DialogActions>
                                    <Button onClick={() => handleDelete(item_id)} variant='contained' sx={{ m: 1 }}>Delete</Button>
                                    <Button onClick={handleClose} variant='contained' sx={{ m: 1 }}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* <CardMedia
                component="img"
                height="194"
                image={item_img}
                alt="Paella dish"
            />
            <CardContent>
                <Typography>
                    {item_name}
                </Typography>
            </CardContent>
            <CardContent style={{ "display": "flex", "justifyContent": "space-between" }}>
                <Typography>
                    {`$${item_price}`}
                </Typography>
                <Rating name="read-only" value={2.5} precision={0.5} readOnly />
            </CardContent>
            <CardActions spacing={2} style={{ "display": "flex", "justifyContent": "space-around" }}>
                <Button>
                    Details
                </Button>
                <Tooltip title="Update">
                    <Button component={Link} to={`/item/update/${item_id}`}>
                        <AiFillEdit size={24} />
                    </Button>
                </Tooltip>
                <Tooltip title="delete">
                    <Button onClick={() => handleDelete(item_id)}>
                        <AiFillDelete size={24} style={{ "color": "red" }} />
                    </Button>
                </Tooltip>
            </CardActions> */}
        </Card >
    );
};

export default Item;