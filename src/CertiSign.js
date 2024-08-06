import './App.css'
import { useState, useEffect } from 'react';
import { Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
    HOST, PORT
} from './constant'

export const CertiSign = () => {
    const [ceftiList, setCeftiList] = useState([])

    const [showTooltip, setShowTooltip] = useState(false);
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

  
    const signCertificate = (id) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://${HOST}:${PORT}/certificate/sign/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                fetchCertiList()
            })
            .catch(error => console.log('error', error));
    }

    const copyClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setShowTooltip(true)
        window.setTimeout(function () {
            setShowTooltip(false)
        }, 2000);
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
                            

                                {e.signature == null && <Button className="signButton" onClick={() => signCertificate(e.id)} variant="warning">
                                    Sign
                                </Button>}

                                {e.signature != null &&

                                    <OverlayTrigger 
                                        key='right'
                                        placement='right'
                                        overlay={
                                            <Tooltip >
                                                Copied
                                            </Tooltip>
                                        }
                                    >


                                        <Button className="copySignButton" onClick={() => { copyClipboard(e.signature) }} variant="success">
                                            Copy signature
                                        </Button></OverlayTrigger>}
                            </td>
                        </tr>
                    })
                }
            </tbody>

        </Table>
    </div>




}