// app.get('/getDataFromDemo',(req,res)=>{
//     async function fetchData(){
//         try {
//             const conn = await oracledb.getConnection({
//                 user:'hr',
//                 password:'123',
//                 connectionString:'localhost:1521/xe'
//                 // connectionString:'localhost/xe'
//             })

            
//             const res = await conn.execute('select * from customers');
//             console.log(res);
//             return res;
//         } catch (error) {
//             return error;
//         }
//     }

//     fetchData().then(res =>{
//         console.log(res);
//         res.send(res);
//     })
//     .catch(err =>{
//         res.send(err)
//     })
// })


// /customers

// const query = `INSERT INTO employee VALUES (:employee_id, :employee_name, :city, :employee_desigination)`;
            // const res = await conn.execute("INSERT INTO employee (employee_id,employee_name,city,employee_desigination) VALUES(:20233,:'sureshkam',:'Indore',:'sales')",{ autoCommit: true });
            // const res = await conn.execute('select * from employee')
            // binds = [
            //     ['101',"Tom Cruise","Delhi","Actor"],
            //     ['102',"Happy Joy","Goa","IT"],
            //     ['103',"Tim Devid","Mumbai","Sales"]
            // ]
            // const res = await conn.executeMany(query,binds, {});
            // const res = await conn.execute('select * from employee')

// to get data
            res = await conn.execute('select * from employee',[] ,{
                resultSet: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            })

            let ans = res.resultSet;

            while((row = await ans.getRow())){
                console.log(row);
            }

            console.log(res);
            return res;

// fetchData().then(res =>{
    //     console.log(res);
    //     // res.send(res);
    // })
    // .catch(err =>{
    //     console.log(err);
    // })