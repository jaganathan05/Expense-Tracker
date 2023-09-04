const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const expenseController = require('./controller/expence');
const sequelize = require('./helper/database');

const app = express();


const expenseRoutes = require('./routes/expense');
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views','views' );



app.use(bodyParser.urlencoded({ extended: false }));

app.use(expenseRoutes);


sequelize.sync().then(res=>{
    //console.log(res)
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})