import './App.css';
import { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { HOST, PORT } from './constant'
export const CertiSearch = () => {
    const [certi, setCerti] = useState(null)
    const [findingCertiID, setFindingCertiID] = useState(null)
    const [searchFirstTime, setsearchFirstTime] = useState(false)
    const [isValidCerti, setIsValidCerti] = useState(false)
    const [messageCerti, setMessageCerti] = useState("")
    
    const fetchCerti = (id) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://${HOST}:${PORT}/certificate/` + id, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                if (searchFirstTime === false) {
                    setsearchFirstTime(true)
                }

                setCerti(result)
                getMessageCerti(id)
                verifyCerti(id)
            })
            .catch(error => console.log('error', error));
    }

    const verifyCerti = (id) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`http://${HOST}:${PORT}/certificate/verify/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result == "true") {
                    setIsValidCerti(true)
                } else {
                    setIsValidCerti(false)
                }
                
            })
            .catch(error => console.log('error', error));



    }

    const getMessageCerti = (id) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`http://${HOST}:${PORT}/certificate/message/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                setMessageCerti(result)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="App">

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <h2>Tra cứu văn bằng</h2>
                    <Form.Control onChange={e => setFindingCertiID(e.target.value)} placeholder="Nhập số hiệu văn bằng" />
                    <Button className="margin-top" variant="primary" onClick={() => fetchCerti(findingCertiID)}>
                        Tìm kiếm
                    </Button>
                    <br />
                    {certi != null && <Table className="margin-top" striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Thông tin văn bằng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Số hiệu</td>
                                <td>{certi.id}</td>
                            </tr>
                            <tr>
                                <td>Họ tên</td>
                                <td>{certi.name}</td>
                            </tr>
                            <tr>
                                <td>Giới tính</td>
                                <td>{certi.gender}</td>
                            </tr>
                            <tr>
                                <td>Ngày sinh</td>
                                <td>{certi.birthday}</td>
                            </tr>
                            <tr>
                                <td>Ngày tốt nghiệp</td>
                                <td>{certi.completeday}</td>
                            </tr>
                            <tr>
                                <td>Chuyên ngành</td>
                                <td>{certi.spec}</td>
                            </tr>
                            <tr>
                                <td>Xếp loại</td>
                                <td>{certi.grade}</td>
                            </tr>
                            <tr>
                                <td>Nội dung ký</td>
                                <td>
                                    {certi.signature && messageCerti.substring(0, 50) + " ..."}
                                    <br/>
                                    {certi.signature && <Button className="margin-top" onClick={() => { navigator.clipboard.writeText(messageCerti) }} variant="success">
                                        Sao chép thông điệp
                                    </Button>}
                                </td>
                            </tr>

                            <tr>
                                <td>Chữ ký xác nhận</td>
                                <td>
                                    {certi.signature == null ? "Chưa ký" : certi.signature.substring(0, 50) + " ..."}
                                    <br/>
                                    {certi.signature && <Button className="margin-top" onClick={() => { navigator.clipboard.writeText(certi.signature) }} variant="success">
                                        Sao chép chữ ký
                                    </Button>}
                                </td>
                            </tr>

                            <tr>
                                <td>Tình trạng</td>
                                <td>
                                    {certi.signature == null && "Chưa ký"}
                                    {certi.signature && (isValidCerti == true ? "Hợp lệ" : "Không hợp lệ")}
                                </td>
                            </tr>
                        </tbody>
                    </Table>}

                    {searchFirstTime && certi == null && <Form.Label>Văn bằng không tồn tại</Form.Label>}


                </Form.Group>
            </Form>
        </div>
    );
}

