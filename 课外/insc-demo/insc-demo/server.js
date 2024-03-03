const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// 创建数据库连接
const db = mysql.createConnection({
    host: 'rm-cn-uqm3imn5g000f60o.rwlb.rds.aliyuncs.com',
    user: 'root',
    password: 'wmzcl1gpt@@@',
    database: 'insc-test'
})
// 连接数据库
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
})

// 设置模板引擎为Pug  
app.set('view engine', 'pug');

// 设置静态文件路径
app.use(express.static('public'));

// 使用body-parser中间件来解析JSON请求体  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 渲染首页  
app.get('/', (req, res) => {
    //查询数据库
    db.query('select * from `test-deploy`',(err, results1)=>{
        if(err){
            console.log(err);
        }else{
            db.query('select * from `test-users`', (err, results2)=>{
                if(err){
                    console.log(err);
                }else{
                    res.render('index',{ 
                        InscriptionsNumber:  results1.length,
                        AddressNumber: results2.length,
                        TransactionsNumber: 'NULL'
                    });
                }
            })
        }
    })
});

// 渲染ins20页面
app.get('/ins20',(req, res)=>{
    //查询数据库
    db.query('select * from `test-deploy`',(err, results)=>{
        if(err){
            console.log(err);
        }else{
            for(var i = 0;i<results;i++){
                console.log(results[i]);
                results[i].push({process:"minting"});
                results[i].push({action:"Mint"});
            }
            res.render('ins20', {ins20s: results});      
        }
    })
})

// 处理前端发送的数据 - Deploy 
app.post('/api/deploy', (req, res) => {
    const receivedData = req.body;
    const data = receivedData.data.split(',');
    const sql = "insert into `test-deploy` (tick_name, total_supply, remind_amount, single_limits) values (?, ?, ?, ?)";
    console.log(data);
    db.query(sql, [data[0], Number(data[1]), Number(data[1]), Number(data[2])], (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result.insertId);
        }
    })
    console.log('Received data:', receivedData);
    res.json({ message: 'Data received successfully!' });
});

// 处理前端发送的数据 - Account 
app.post('/api/accounts', (req, res) => {
    const receivedData = req.body;
    const account = receivedData.accounts
    const sql = "insert into `test-users` (userAccount) values (?)";
    console.log(account);
    db.query(sql, [account], (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result.insertId);
        }
    })
    console.log('Received data:', receivedData);
    res.json({ message: 'Data received successfully!' });
});

// 处理Mint时发送的数据 - 更新
app.post('/api/mint', (req, res) => {
    const receivedData = req.body;
    const index = receivedData.index
    const single_limits = receivedData.single_limits
    const sql = "update `test-deploy` set remind_amount = remind_amount-? where id = ?";
    console.log(index);
    db.query(sql, [index, single_limits], (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log("result:"+result);
        }
    })
    console.log('Received data:', receivedData);
    res.json({ message: 'Data received successfully!' });
});


const port = 80;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});