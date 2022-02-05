/* eslint-disable array-callback-return */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import { Badge, Button, Checkbox, Container, CssBaseline, Dialog, DialogActions, DialogTitle, Divider, FormControl, FormControlLabel, IconButton, InputLabel, List, MenuItem, Paper, Select, Slide, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useForm } from 'react-hook-form';
import { mainListItems, secondaryListItems } from '../../components/ListItems';
import useItemData from '../../hooks/itemData';
import useCategoriesData from '../../hooks/categoryData';







function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/">
                Gaogram
            </Link>{' '}
            {2021}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function UpdateItem() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [dialogueOpen, setDialogueOpen] = React.useState(false);
    const handleOpen = () => setDialogueOpen(true);
    const handleClose = () => setDialogueOpen(false);

    const { id } = useParams();
    const items = useItemData({});
    // eslint-disable-next-line 
    const item = items.filter(item => item.item_id == id);
    const navigate = useNavigate();
    const categories = useCategoriesData({});
    const { register, handleSubmit } = useForm();

    // image
    const [image,setImage] = React.useState(null);

    const onSubmit = data => {
        const { itemName, itemDescription, price, categoryId, inStock, isActive } = data;
        const date_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        // const updatedItem = { item_name: itemName, item_img: imageLink, item_desc: itemDescription, item_price: price, cat_id: categoryId, update_date: date_time, in_stock: inStock, is_active: isActive };
        

        const formData = new FormData();
        formData.append('item_name',itemName)
        formData.append('item_img',image)
        formData.append('item_desc',itemDescription)
        formData.append('item_price',price)
        formData.append('cat_id',categoryId)
        formData.append('update_date',date_time)
        formData.append('in_stock',inStock)
        formData.append('is_active',isActive)


        if (formData) {
            handleUpdate(id, formData)
        }
    };

    const handleUpdate = (id, updatedItem) => {
        const url = `http://localhost:3100/item/update/${id}`;
        axios.put(url, updatedItem)
            .then(res => {
                if (res.data.affectedRows === 1) {
                    navigate('/items');
                }
            })
    }



    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Item List
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} xs={6}>
                                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                            <Typography component="h1" variant="h4" align="center" sx={{ my: 3 }}>
                                                Update Item
                                            </Typography>
                                            <React.Fragment>
                                                {
                                                    item.map((item) => (
                                                        
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                
                                                                <TextField
                                                                    id="itemName"
                                                                    name="itemName"
                                                                    label="Item Name"
                                                                    fullWidth
                                                                    variant="standard"
                                                                    defaultValue={item.item_name}
                                                                    {...register("itemName", { required: true })}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    type="file"
                                                                    accept="image/*"
                                                                    id="image-upload"
                                                                    name="image"
                                                                    label="Upload Image"
                                                                    onChange={e => setImage(e.target.files[0])}
                                                                    fullWidth
                                                                    variant="standard"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="itemDescription"
                                                                    name="itemDescription"
                                                                    label="Item Description"
                                                                    fullWidth
                                                                    multiline
                                                                    defaultValue={item.item_desc}
                                                                    variant="standard"
                                                                    {...register("itemDescription", { required: true, maxLength: 200 })}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="price"
                                                                    name="price"
                                                                    label="Price"
                                                                    type="number"
                                                                    fullWidth
                                                                    defaultValue={item.item_price}
                                                                    variant="standard"
                                                                    {...register("price", { required: true })}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
                                                                    <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                                                                    <Select
                                                                        {...register("categoryId", { required: true })}
                                                                        labelId="demo-simple-select-standard-label"
                                                                        id="demo-simple-select-standard"
                                                                        defaultValue={item.cat_id}
                                                                        label="category"
                                                                    >
                                                                        {categories.map((category) => (
                                                                            <MenuItem value={category.cat_id}>{category.cat_name}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="inStock"
                                                                    name="inStock"
                                                                    label="In Stock"
                                                                    type="number"
                                                                    fullWidth
                                                                    defaultValue={item.in_stock}
                                                                    variant="standard"
                                                                    {...register("inStock", { required: true })}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <FormControlLabel control={<Checkbox defaultChecked={item.is_active === 1 ? true : false} />} label="Is Active?" {...register("isActive")} />
                                                            </Grid>
                                                        </Grid>
                                                    ))
                                                }
                                                <Button onClick={handleOpen} variant='contained' sx={{ mt: 4 }}>Save</Button>
                                                <Dialog
                                                    open={dialogueOpen}
                                                    TransitionComponent={Transition}
                                                    keepMounted
                                                    onClose={handleClose}
                                                    aria-describedby="alert-dialog-slide-description"
                                                >
                                                    <DialogTitle>{"Do you want to UPDATE this item?"}</DialogTitle>
                                                    <DialogActions>
                                                        <Button onClick={handleSubmit(onSubmit)} variant='contained' sx={{ m: 1 }}>Update</Button>
                                                        <Button onClick={handleClose} variant='contained' sx={{ m: 1 }}>Cancel</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </React.Fragment>
                                        </Paper>
                                        <Button component={Link} to="/items" variant="contained" sx={{ width: "8rem" }}>Go Back</Button>
                                    </Container >
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}