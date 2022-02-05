const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path')
const bcrypt = require('bcryptjs')
require('dotenv').config();
const mysql = require("mysql");
const fileUpload = require('express-fileupload');
const { dirname } = require('path/posix');
const port = 3100;




app.use(cors());
app.use(express.json());
app.use(fileUpload());






const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gaogram",
});


// app.post('/admin', async (req, res) => {

//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password,10);
//         const user = { name: req.body.name, password: hashedPassword };
//         users.push(user);
//         res.send(users)
//     }
//     catch {
//         res.send("hello")
//     }
// })












app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    if (name && password) {
        db.query('select * from admin where user_name=?', [name], async (err, result) => {
            if (err) {
                return res.status(500).send();
            }
            const user = result[0];
            console.log(user);
            if (user === null) {
                return res.send("user not found");
            }
            try {
                if (await bcrypt.compare(password, user.pass)) {
                    const payLoad = {
                        id: user.id,
                        email: user.email
                    };
                    const token = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET)
                    return res.status(200).json({ message: true, token: token })
                }
                else {
                    return res.json({ message: false })
                }
            }
            catch {
                res.send("Wrong User or Password")
            }
        })
    }
    else {
        res.send("Enter User Name And Password")
    }
})


app.get('/users', async (req, res) => {
    db.query("SELECT * FROM user_details", (err, result) => {
        err ? console.log(err) : res.send(result);
    });
})


app.get('/items', async (req, res) => {
    db.query("SELECT * FROM items", (err, result) => {
        err ? console.log(err) : res.send(result)
    });
})


app.delete('/item/delete/:id', async (req, res) => {
    const id = req.params.id
    db.query(`DELETE From items WHERE item_id=${id}`, (err, result) => {
        err ? console.log(err) : res.send(result);
    })
})

app.put('/item/update/:id', async (req, res) => {
    const id = req.params.id

    const image = req.files.item_img;
    const uploadPath = "../gaogram-dashboard-client/public" + '/images/item_images/' + image.name;
    image.mv(uploadPath, (err, result) => {
        err ? console.log(err) : res.send(result)
    })

    const item_img = 'images/item_images/' + image.name;
    const { item_name, item_desc, item_price, cat_id, update_date, in_stock, is_active } = req.body;
    db.query(`UPDATE items SET item_name='${item_name}',item_img='${item_img}',item_desc='${item_desc}',item_price='${item_price}',cat_id='${cat_id}',update_date='${update_date}',in_stock='${in_stock}',is_active='${is_active == true ? 1 : 0}' WHERE item_id=${id}`, (err, result) => {
        err ? console.log(err) : res.send(result);
    })
})



app.post('/item/add', async (req, res) => {
    const image = req.files.item_img;
    const uploadPath = "../gaogram-dashboard-client/public" + '/images/item_images/' + image.name;
    image.mv(uploadPath, (err, result) => {
        err ? console.log(err) : res.send(result)
    })

    const item_img = 'images/item_images/' + image.name;
    const { item_name, item_desc, item_price, cat_id, create_date, in_stock, is_active } = req.body;
    db.query(`INSERT INTO items(item_name,item_img,item_desc,item_price,cat_id,create_date,in_stock,is_active) VALUES ('${item_name}','${item_img}','${item_desc}','${item_price}','${cat_id}','${create_date}','${in_stock}','${is_active == true ? 1 : 0}')`, (err, result) => {
        err ? console.log(err) : res.send(result);
    })
})










app.get('/categories', async (req, res) => {
    db.query("SELECT * FROM categories", (err, result) => {
        err ? console.log(err) : res.send(result)
    });
})

app.put('/category/update/:id', async (req, res) => {
    const id = req.params.id
    const { cat_name, cat_desc, update_date, is_active } = req.body;
    db.query(`UPDATE categories SET cat_name='${cat_name}',cat_desc='${cat_desc}',update_date='${update_date}',is_active='${is_active === true ? 1 : 0}' WHERE cat_id=${id}`, (err, result) => {
        err ? console.log(err) : res.send(result);
    })
})

app.delete('/category/update/:id', async (req, res) => {
    const id = req.params.id
    db.query(`DELETE From categories WHERE cat_id=${id}`, (err, result) => {
        err ? console.log(err) : res.send(result);
    })
})

app.post('/category/add', async (req, res) => {
    const { cat_name, cat_desc, create_date, is_active } = req.body;
    db.query(`INSERT INTO categories(cat_name, cat_desc, create_date, is_active) VALUES ('${cat_name}','${cat_desc}','${create_date}','${is_active === true ? 1 : 0}')`, (err, result) => {
        err ? console.log(err) : res.send(result);
    })
})





function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.status(401).send(); // Unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    })
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})