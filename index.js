const express = require('express');
// const morgan = require('morgan')

const app = express();
// app.use(morgan('tiny'));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());



app.get('/', function (req, res) {
    res.render("index", {
        x: '',
        y: '',
        result: '',
        n: '',
    }); 
})

function checkNumber(str) {
    var reg =/^[+-]?\d+(\.\d+)?$/;
    return reg.test(str);
}

app.post('/', function (req, res) {
    let obj = req.body;
    obj.result = '';
    obj.n = '';
    

    if(checkNumber(obj.x) == false)
    {
        obj.n = 'Giá trị nhập ở ô Số thứ nhất không phải là số.';
        res.render("index",  obj);
    }
    if(checkNumber(obj.y) == false)
    {
        obj.n = 'Giá trị nhập ở ô Số thứ hai không phải là số.';
        res.render("index",  obj);
    }

    switch(obj.cal)
    {
        case 'plus':
            obj.result = parseFloat(obj.x) + parseFloat(obj.y);
            break;
        case 'minus':
            obj.result = Number(obj.x) - Number(obj.y);
            break;
        case 'multi':
            obj.result = Number(obj.x) * Number(obj.y);
            break;
        case 'divide':
            obj.result = Number(obj.x) / Number(obj.y);
            break;
        default:
            obj.n = 'Vui lòng chọn phép tính';
            res.render("index",  obj); 
    }

    obj.n = 'Success';
    res.render("index",  obj); 
})

app.listen(3000, () => console.log(`Example app listening at: http://localhost:3000`));

