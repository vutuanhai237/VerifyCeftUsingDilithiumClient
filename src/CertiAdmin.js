import './App.css'
import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

import {
    HOST, PORT
} from './constant'

export const CertiAdmin = () => {
    const [ceftiList, setCeftiList] = useState([])
    //const targetCopy = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            fetchCertiList()
        }, 1000)

        return () => clearInterval(interval);

    }, [])
    const fetchCertiList = () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://${HOST}:${PORT}/certificate`, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                setCeftiList(result)
            })
            .catch(error => console.log('error', error))
    }

    const deleteCertificate = (id) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`http://${HOST}:${PORT}/certificate/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                fetchCertiList()
            })
            .catch(error => console.log('error', error));
    }

    
    return <div className='App'>
       

        <h2>List certificate</h2>
        <Table className="margin-top" responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    ceftiList.map(e => {
                        return <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.signature == null ? "Unsigned" : "Signed"}</td>
                            <td>
                                <Button className="margin-right" onClick={() => deleteCertificate(e.id)} variant="danger">
                                    Delete
                                </Button>

                              
                            </td>
                        </tr>
                    })
                }
            </tbody>

        </Table>
    </div>




}