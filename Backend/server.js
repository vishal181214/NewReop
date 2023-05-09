import express from 'express';
import cors from 'cors';
import conn from './connection.js';
import oracledb from 'oracledb';
const app = express();
// require('../instantclient_21_9')

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
app.use(cors());


app.get('/',(req,res)=>{
    res.send("Hello");
})

app.get('/unionusers',async(req,res)=>{
    console.log("API Hitted");
        try {
            console.log("inside try");
            console.log("before query");
            const result = await conn.execute('select * from PR_PROJECT_HDR t,pr_proj_dtl d where PRPH_ORG_ID = d.prpd_org_id and PRPH_OPR_ID = d.prpd_opr_id and PRPH_SEGMENT = d.prpd_segment and PRPH_YEAR = d.prpd_year and PRPH_CD = d.prpd_cd and PRPH_NO = d.prpd_no and ROWNUM<=50');
            conn.commit();
            console.log(result.rows); 
            // console.log(result); 
            res.send(result.rows);          
        } catch (error) {
            console.log(error);

            return error;
        }  
})

app.get('/customers',async(req,res)=>{
    console.log("API Hitted");
        try {
            console.log("before query");
            const result = await conn.execute('select * from employee');
            conn.commit();
            console.log(result.rows); 
            console.log(result); 
            res.send(result.rows);          
        } catch (error) {
            console.log(error);

            return error;
        }  
})

// alter table EMPLOYEE add (contact varchar2(50));

app.get('/alterTable',async(req,res)=>{
    console.log("API Hitted");
        try {
            console.log("before query");
            const result = await conn.execute('alter table EMPLOYEE add (address varchar2(50))');
            conn.commit();
            console.log(result); 
            res.send(result);          
        } catch (error) {
            console.log(error);
            return error;
        }  
})

app.get('/removCol',async(req,res)=>{
    console.log("API Hitted");
        try {
            console.log("before query");
            const result = await conn.execute('alter table EMPLOYEE drop column contact');
            conn.commit();
            console.log(result); 
            res.send(result);          
        } catch (error) {
            console.log(error);
            return error;
        }  
})

app.post('/insertIntoSpecCol',async(req,res)=>{
    console.log(req.body);
        try { 
            // UPDATE EMPLOYEE SET salary = '23000', address='Maharashtra' WHERE EMPLOYEE_ID = 124;
            console.log("before query");
            const result = await conn.execute('update employee set salary=:fn,address=:fd where employee_id=:id',
            {fn: req.body.salary, fd:req.body.address, id:req.body.empId},
            {autoCommit: true});
            // conn.commit();
            console.log(result); 
            res.send(result);          
        } catch (error) {
            console.log(error);
            return error;
        }  
})

app.get('/getProjInfo',async(req,res)=>{
    console.log(req.body);
        try { 
            // UPDATE EMPLOYEE SET salary = '23000', address='Maharashtra' WHERE EMPLOYEE_ID = 124;
            console.log("before query");
            const result = await conn.execute('select prph_ord_no, prph_name,prpm_desc, prpm_ass_rate_lp from PR_PROJECT_HDR hr,PR_PRD_MST mst where hr.prph_org_id=mst.prpm_org_id and ROWNUM<=50');
            conn.commit();
            console.log(result); 
            res.send(result);          
        } catch (error) {
            console.log(error);
            return error;
        }  
})

app.get('/getInfoWithOrderEntry',async(req,res)=>{
    console.log(req.body);
        try { 
            // UPDATE EMPLOYEE SET salary = '23000', address='Maharashtra' WHERE EMPLOYEE_ID = 124;
            console.log("before query");
            const result = await conn.execute('select prom_order_no,prom_cust_name,prpd_prd_cd,prpm_desc,prpm_bill_cd,prpd_billing_code,prph_val from PR_PROJ_DTL dtl,PR_ORDERENTRY_MST mst,PR_PRD_MST prd,PR_PROJECT_HDR hdr where dtl.prpd_org_id = mst.prom_org_id and prd.prpm_org_id=hdr.prph_org_id and ROWNUM<=50');
            conn.commit();
            console.log(result); 
            res.send(result);          
        } catch (error) {
            console.log(error);
            return error;
        }  
})

app.listen(4550,()=>{
    console.log("Server Running");
})

// select prph_ord_no, prph_name,prpm_desc, prpm_ass_rate_lp from PR_PROJECT_HDR hr,PR_PRD_MST mst where hr.prph_org_id=mst.prpm_org_id;
