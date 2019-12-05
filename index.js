const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'keyboard cat5 run all 0v3r',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


let brandList = ["Nissan", "Toyota"]

app.post("/api/brand_add", function(req, res){
    console.log(req.body.brand_name)
    brandList.push(req.body.brand_name)
    res.json({
        status:"success"
    })
})

app.get('/api/brand_list', function(req, res){
    res.json(brandList)
});

app.post("/api/brands_delete", function(req, res){
    brandList = []
    res.json({
        status:"success"
    })
})

const PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log('started on: ', this.address().port);
});