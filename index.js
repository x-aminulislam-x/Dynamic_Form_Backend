const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 7000;

app.post('/form_publish/:form_id', (req, res) => {
    const { form_id } = req.params;
    const form_data = req.body;
    console.log(form_data);
    let data = JSON.stringify(form_data);
    fs.writeFileSync(`files/${form_id}.json`, data);
    res.send({ status: 200, form_link: `http://localhost:3000/f/${form_id}` })
    // res.status(200).send({ success: false, error: { message: 'No blah Found' } });
})

app.get('/form/:form_id', (req, res) => {
    const { form_id } = req.params;
    fs.readFile(`files/${form_id}.json`, (err, data) => {
        if (err) throw err;
        let quesData = JSON.parse(data);
        res.send(quesData);
    })
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})