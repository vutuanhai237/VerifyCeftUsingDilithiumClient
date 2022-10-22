import './App.css'
import { useState, useEffect, useRef } from 'react';
import { Button, Table, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
    HOST, PORT
} from './constant'

export const CertiAdmin = () => {
    const [ceftiList, setCeftiList] = useState([])
    const [ceftiName, setCertiName] = useState("")
    const [ceftiGender, setCertiGender] = useState("Name")
    const [ceftiBirthday, setCertiBirthday] = useState("")
    const [ceftiSpec, setCertiSpec] = useState("SE")
    const [ceftiGrade, setCertiGrade] = useState("Good")
    const [ceftiCompleteday, setCertiCompleteday] = useState("")
    const [showTooltip, setShowTooltip] = useState(false);
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
       

        <h2>Danh sách văn bằng</h2>
        <Table className="margin-top" responsive>
            <thead>
                <tr>
                    <th>Số hiệu</th>
                    <th>Họ tên</th>
                    <th>Tình trạng văn bằng</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {
                    ceftiList.map(e => {
                        return <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.signature == null ? "Chưa ký" : "Đã ký"}</td>
                            <td>
                                <Button className="margin-right" onClick={() => deleteCertificate(e.id)} variant="danger">
                                    Xóa
                                </Button>

                                {e.signature == null && <Button className="signButton" onClick={() => signCertificate(e.id)} variant="warning">
                                    Ký
                                </Button>}

                                {e.signature != null &&

                                    <OverlayTrigger 
                                        key='right'
                                        placement='right'
                                        overlay={
                                            <Tooltip >
                                                Đã sao chép
                                            </Tooltip>
                                        }
                                    >


                                        <Button className="copySignButton" onClick={() => { copyClipboard(e.signature) }} variant="success">
                                            Sao chép chữ ký
                                        </Button></OverlayTrigger>}
                            </td>
                        </tr>
                    })
                }
            </tbody>

        </Table>
    </div>




}