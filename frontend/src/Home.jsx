import React, { useEffect } from 'react';
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useState } from 'react';


function Home() {
    const [result, setResult] = useState([]);
    const [name,setName] = useState('');
    const [desi,setDesi] = useState('');
    const [city,setCity] = useState('');
    const [empId,setEmpId] = useState('');
    const [show,setShow] = useState(false);
    const [dis,setDis] = useState(false);
    const [id,setId] = useState(false);
    const getinfo = async () => {
        try {
            await axios.get("http://localhost:4530/customers").then(res =>{
                const response = res.data;
                // console.log(response);
                setResult(response);
            }).catch((err)=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    };

    const editUser = (empId) =>{
        setDis(false);
        setShow(true);
        setEmpId(empId);
        console.log(empId);
    }

    const setUserForm = () =>{
        setShow(false);
        setDis(true);
    }

    const submitData = async() =>{
        console.log(empId,name,desi,city);
        try {
            const res = await axios.post('http://localhost:4530/editUser',{
                name,
                desi,
                city,
                empId
            })
            if(res){
                alert("user upated");
            }
            else{
                console.log("error while updating user.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const adduser = async() =>{
        try {
            const user = await axios.post('http://localhost:4530/adduser',{
                id,name,desi,city
            })

            if(user)
            { console.log("Register SucessFully"); }
            else{
                console.log("Error in while registering user");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async(empId) =>{
        console.log(empId);
        try {
            const res = await axios.post('http://localhost:4530/deleteuser',{
                empId
            })
            if(res){
                getinfo();
                console.log("user deleted");
            }
            else{
                console.log("error while updating user.");
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
        getinfo();
    },[])
    // console.log(result);
    return (
        <div>
            <h3>Employee Info Table</h3>
            <button onClick={setUserForm} className='empBtn'>Add Employee</button>
            <MDBTable align="middle" className='tableDiv'>
                <MDBTableHead>
                    <tr>
                        <th scope="col">Employee Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Desigination</th>
                        <th scope="col">City</th>
                        <th scope="col">Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        result.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.EMPLOYEE_ID}</td>
                                    <td>{item.EMPLOYEE_NAME}</td>
                                    <td>{item.CITY}</td>
                                    <td>{item.EMPLOYEE_DESIGINATION}</td>
                                    <td>
                                        <button onClick={()=>editUser(item.EMPLOYEE_ID)}>
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={()=>deleteUser(item.EMPLOYEE_ID)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </MDBTableBody>
            </MDBTable>
            <div>
            {
                show ? <div className='inputTable'>
                <label htmlFor="name">Name</label>
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/><br/><br/>
                <label htmlFor="name">Desigination</label>
                <input type='text' className='desiInput' value={desi} onChange={(e)=>setDesi(e.target.value)}/><br/><br/>
                <label htmlFor="name">City</label>
                <input type='text' value={city} onChange={(e)=>setCity(e.target.value)}/><br/><br/>
                <button onClick={submitData}>Save</button>
            </div> :<></>
            }
            </div>

            <div>
            {
                dis ? <div className='inputTable'>
                <label htmlFor="name">Emp Id</label>
                <input type='text' value={id} onChange={(e)=>setId(e.target.value)}/><br/><br/>
                <label htmlFor="name">Name</label>
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/><br/><br/>
                <label htmlFor="name">Desigination</label>
                <input type='text' className='desiInput' value={desi} onChange={(e)=>setDesi(e.target.value)}/><br/><br/>
                <label htmlFor="name">City</label>
                <input type='text' value={city} onChange={(e)=>setCity(e.target.value)}/><br/><br/>
                <button onClick={adduser}>Add User</button>
            </div> :<></>
            }
            </div>
            
        </div>

    )
}

export default Home
