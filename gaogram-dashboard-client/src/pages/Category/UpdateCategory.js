import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Badge, Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogTitle, Divider, IconButton, List, Paper, Slide, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useCategoriesData from '../../hooks/categoryData'
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useForm } from 'react-hook-form';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../../components/ListItems';






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


export default function UpdateCategory() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [updateOpen, setUpdateOpen] = React.useState(false);
    const handleUpdateOpen = () => setUpdateOpen(true);
    const handleUpdateClose = () => setUpdateOpen(false);


    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);


    const { id } = useParams();
    const categories = useCategoriesData({});
    // eslint-disable-next-line eqeqeq
    const category = categories.filter(category => category.cat_id == id);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        const { categoryName, categoryDescription, isActive } = data;
        const date_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const updatedCategory = { cat_name: categoryName, cat_desc: categoryDescription, update_date: date_time, is_active: isActive };
        if (updatedCategory) {
            handleUpdate(id, updatedCategory)
        }
    };

    const handleUpdate = (id, updatedCategory) => {
        const url = `http://localhost:3100/category/update/${id}`;
        axios.put(url, updatedCategory)
            .then(res => {
                if (res.data.affectedRows === 1) {
                    navigate('/category');
                }
            })
    }

    const handleDelete = id => {
        const url = `http://localhost:3100/category/update/${id}`;
        axios.delete(url)
            .then(res => {
                if (res.data.affectedRows === 1) {
                    navigate('/category');
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
                            Category
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
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                            <Typography component="h1" variant="h4" align="center" sx={{ my: 3 }}>
                                                Update Category
                                            </Typography>
                                            <React.Fragment>
                                                {
                                                    category.map((category) => (
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    required
                                                                    id="categoryName"
                                                                    name="categoryName"
                                                                    label="Category Name"
                                                                    fullWidth
                                                                    defaultValue={category.cat_name}
                                                                    autoComplete="shipping address-line1"
                                                                    variant="standard"
                                                                    {...register("categoryName", { required: true, maxLength: 20 })}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="categoryDescription"
                                                                    name="categoryDescription"
                                                                    label="Category Description"
                                                                    fullWidth
                                                                    multiline
                                                                    defaultValue={category.cat_desc}
                                                                    autoComplete="shipping address-line2"
                                                                    variant="standard"
                                                                    {...register("categoryDescription", { required: true, maxLength: 200 })}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <FormControlLabel control={<Checkbox defaultChecked={category.is_active === 1 ? true : false} />} label="Is Active?" {...register("isActive")} />
                                                            </Grid>
                                                        </Grid>
                                                    ))
                                                }
                                                <Button onClick={handleUpdateOpen} variant='contained' sx={{ mx: 2 }}>Save</Button>
                                                <Dialog
                                                    open={updateOpen}
                                                    TransitionComponent={Transition}
                                                    keepMounted
                                                    onClose={handleUpdateClose}
                                                    aria-describedby="alert-dialog-slide-description"
                                                >
                                                    <DialogTitle>{"Do you want to UPDATE this category?"}</DialogTitle>
                                                    <DialogActions>
                                                        <Button onClick={handleSubmit(onSubmit)} variant='contained' sx={{ m: 1}}>Update</Button>
                                                        <Button onClick={handleUpdateClose} variant='contained' sx={{ m: 1}}>Cancel</Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <Button onClick={handleDeleteOpen} variant="contained" color="secondary" sx={{ mx: 2 }} >Delete</Button>
                                                <Dialog
                                                    open={deleteOpen}
                                                    TransitionComponent={Transition}
                                                    keepMounted
                                                    onClose={handleDeleteClose}
                                                    aria-describedby="alert-dialog-slide-description"
                                                >
                                                    <DialogTitle>{"Do you want to DELETE this category?"}</DialogTitle>
                                                    <DialogActions>
                                                        <Button onClick={() => handleDelete(id)} variant='contained' sx={{ m: 1}}>Delete</Button>
                                                        <Button onClick={handleDeleteClose} variant='contained' sx={{ m: 1}}>Cancel</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </React.Fragment>
                                        </Paper>
                                        <Button component={Link} to="/category" variant="contained" sx={{ width: "8rem" }}>Go Back</Button>
                                    </Container>
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