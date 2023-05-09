const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
app.use(cors());

// const connect = async() =>{
//     try {
//         const conn = await oracledb.getConnection({
//             user:'sostest',
//             password:'S0stesT321',
//             // connectionString:'localhost:1521/xe'
//             connectionString:'129.154.234.192:1521/sosdb'
//         })
//     }catch(err){
//         console.log(err);
//     }
// }

// connect();

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.get('/customers',async(req,res)=>{
    console.log("API Hitted");
        try {
            const conn = await oracledb.getConnection({
                user:'sostest',
                password:'S0stesT321',
                // connectionString:'localhost:1521/xe'
                connectionString:'129.154.234.192:1521/sosdb'
            })
            if(conn)
            console.log("Connected!");

            // (employee_id, employee_name, city, employee_desigination) 
            // const res = await conn.execute('CREATE TABLE employee ( employee_id number(10) NOT NULL,employee_name varchar2(50) NOT NULL,city varchar2(50),employee_desigination varchar2(50) NOT NULL)');
            
            // const res =  await conn.execute("insert into employee values(127,'Tanmay','Mumbai','Manager')");
            // conn.commit();

            result = await conn.execute('select * from employee order by employee_id asc');
            conn.commit();
            // let outData = JSON.stringify(res);
            console.log(result.rows); 
            console.log(result); 
            res.send(result.rows);          
        } catch (error) {
            return error;
        }  
})



app.get('/userInfo',async(req,res)=>{
    console.log("API Hitted");
        try {
            console.log("inside try");
            const conn = await oracledb.getConnection({
                user:'sostest',
                password:'S0stesT321',
                // connectionString:'localhost:1521/xe'
                connectionString:'129.154.234.192:1521/sosdb'
            })
            if(conn)
            console.log("Connected!");
            
            console.log("before query");

            result = await conn.execute('select * from employee');
            conn.commit();
            // let outData = JSON.stringify(res);
            console.log(result.rows); 
            console.log(result); 
            res.send(result.rows);          
        } catch (error) {
            return error;
        }  
        console.log("Api Existed");
})

app.post('/editUser', async(req,res)=>{
    console.log(req.body);
    try {
        const conn = await oracledb.getConnection({
            user:'sostest',
            password:'S0stesT321',
            // connectionString:'localhost:1521/xe'
            connectionString:'129.154.234.192:1521/sosdb'
        })
        const result = await conn.execute('update employee set employee_name=:fn,employee_desigination=:fd,city=:fc where employee_id=:id',
        {fn: req.body.name, fd:req.body.desi, fc:req.body.city, id:req.body.empId},
        {autoCommit: true});
        if(result)
            console.log(result);
        else
            console.log("error to update data");
    } catch (error) {
        console.log(error);
    }
})


//     result = await connection.execute(`INSERT INTO EMPLOYEES VALUES (:id, :empname, :emplastname, :age)`,
//     [req.body.ID, req.body.EMPNAME, req.body.EMPLASTNAME, req.body.AGE],
//     {autoCommit: true}
// );

app.post('/adduser',async(req,res)=>{
    console.log(req.body);
    console.log(req.body.id);
    try {
        const conn = await oracledb.getConnection({
            user:'sostest',
            password:'S0stesT321',
            // connectionString:'localhost:1521/xe'
            connectionString:'129.154.234.192:1521/sosdb'
        })
        const result = await conn.execute('insert into employee values(:employee_id,:employee_name,:employee_desigination,:city)',
        [req.body.id, req.body.name, req.body.desi, req.body.city],
        {autoCommit: true});
        if(result)
            console.log(result);
        else
            console.log("error to update data");
    } catch (error) {
        console.log(error);
    }
})

app.post('/deleteuser',async(req,res)=>{
    console.log(req.body);
    try {
        const conn = await oracledb.getConnection({
            user:'sostest',
            password:'S0stesT321',
            // connectionString:'localhost:1521/xe'
            connectionString:'129.154.234.192:1521/sosdb'
        })
        const result = await conn.execute('delete from employee where employee_id=:id',
        {id:req.body.empId},
        {autoCommit: true});
        if(result)
            console.log(result);
        else
            console.log("error to update data");
    } catch (error) {
        console.log(error);
    }
})


// app.get('/alteruser',async(req,res)=>{
//     console.log(req.body);
//     try {
//         const conn = await oracledb.getConnection({
//             user:'sostest',
//             password:'S0stesT321',
//             // connectionString:'localhost:1521/xe'
//             connectionString:'129.154.234.192:1521/sosdb'
//         })
//         console.log("Connected!");
//         const result = await conn.execute('select * from employee',
//         {autoCommit: true});
//         if(result)
//             console.log(result);
//         else
//             console.log("error to update data");
//     } catch (error) {
//         console.log(error);
//     }
// })

app.listen(4530,()=>{
    console.log("Server Running");
})