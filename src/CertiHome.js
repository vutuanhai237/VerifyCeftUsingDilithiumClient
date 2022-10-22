import './App.css'
import { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';

import {
    HOST, PORT
} from './constant'

export const CertiHome = () => {
    const [publicKey, setPublicKey] = useState("")


    useEffect(() => {
        fetchPublicKey()
    }, [])
    const fetchPublicKey = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/dilithium/publickey", requestOptions)
            .then(response => response.text())
            .then(result => {
                setPublicKey(result)
            })
            .catch(error => console.log('error', error));
    }
    return <div className='App'>
        <h2>Khóa công khai của hiệu trưởng</h2>
        <text className = "margin-top">
            {publicKey.substring(0, 50) + " ..."}
        </text>
        <br/>
        <Button className = "margin-top" onClick={() => { navigator.clipboard.writeText(publicKey) }} variant="success">
            Sao chép khóa
        </Button>
    </div>
}