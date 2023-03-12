const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


// create a row

app.post("/todo", async (req, resp) => {

    try {

        // console.log(req.body);
        // resp.send(req.body);
        const { description } = req.body;
        const query = "insert into todo (description) values ($1) returning* "
        const values = [description];
        let result = await pool.query(query, values);
        // result = await result.json() 
        resp.send(result.rows[0]);

    } catch (err) {
        resp.status(500).send({ Error: err.message })
    }
})


//get all 

app.get("/", async (req, resp) => {
    try {

        const query = "select * from todo order by todo_id desc";        
        let result = await pool.query(query);
        // result =await result.json();

        resp.send(result.rows)

    } catch (err) {

        resp.status(500).send({ Error: err.message })


    }

})


//get one 

app.get('/find/:id', async (req, resp) => {

    try {
        const { id } = req.params;
        const query = "select * from todo where todo_id = $1"
        const value = [id];
        const result = await pool.query(query, value);
        resp.send(result.rows[0]);


    } catch (err) {

        resp.status(500).send({ Error: err.message })

    }
})



// update a row



app.put('/update/:id', async (req, resp) => {

    try {

        const { id } = req.params;
        const { description } = req.body;
        const value = [id, description]
        const query = "update todo set description = $2 where todo_id = $1 returning*"
        const result = await pool.query(query, value);
        resp.send(result.rows[0])


    } catch (err) {
        resp.status(500).send({ Error: err.message })

    }

})



// delete a row 

app.delete("/delete/:id", async (req, resp) => {
    try {


        const { id } = req.params;
        const value = [id];
        const query = "delete from todo where todo_id = $1";
        const result = await pool.query(query, value);
        if (result.rowCount > 0) {

            resp.send({ Result: `No.of rows deleted = ${result.rowCount}` });
        } else {
            resp.send({ Result: "Data Not Present" });
        }

    } catch (err) {
        resp.status(500).send({ Error: err.message })

    }
})

// search api based on the content present 

app.get("/search/:key", async (req, resp) => {

    const { key } = req.params;
    const value = [`%${key}%`];
    const query = 'select * from todo where description like $1 '
    const result = await pool.query(query, value);
    resp.send(result.rows);
})


app.listen(5050, () => {
    console.log("Server Started at port 5050");
})