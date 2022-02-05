import * as React from 'react';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import './ItemList.css';
import Item from './Item';
import { Button, Grid } from '@mui/material';






export default function ItemList(props) {
    const items = props.items;
    const PER_PAGE = 6;
    const count = Math.ceil(items.length / PER_PAGE);
    let [page, setPage] = React.useState(1);

    const [firstItem, setFirstItem] = React.useState(0)
    const [lastItem, setLastItem] = React.useState(PER_PAGE)

    const handleIncrease = (e, p) => {
        setPage(count > page ? page + 1 : count)
        if (page !== count) {
            const newFirstItem = firstItem + PER_PAGE;
            setFirstItem(newFirstItem)
            const newLastItem = lastItem + PER_PAGE;
            setLastItem(newLastItem);
        }
    };

    const handleDecrease = (e, p) => {
        setPage(page !== 1 ? page - 1 : 1)
        if (page !== 1) {
            const newFirstItem = firstItem - PER_PAGE;
            setFirstItem(newFirstItem)
            const newLastItem = lastItem - PER_PAGE;
            setLastItem(newLastItem);
        }
    };

    return (
        <React.Fragment>
            <div className="cards">
                {
                    items.slice(firstItem, lastItem).map(item => <Item key={item.item_id} item={item} />)
                }
            </div>
            <Grid container spacing={2} sx={{ justifyContent: "right" }}>
                <Grid item><Button variant="outlined" color="primary" onClick={handleDecrease}>Previous Page</Button></Grid>
                <Grid item><Button variant="outlined" color="primary" onClick={handleIncrease}>Next Page</Button></Grid>
            </Grid>
        </React.Fragment>
    );
}