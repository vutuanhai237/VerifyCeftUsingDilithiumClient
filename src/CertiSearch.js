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
                    <h2>Tra c???u v??n b???ng</h2>
                    <Form.Control onChange={e => setFindingCertiID(e.target.value)} placeholder="Nh???p s??? hi???u v??n b???ng" />
                    <Button className="margin-top" variant="primary" onClick={() => fetchCerti(findingCertiID)}>
                        T??m ki???m
                    </Button>
                    <br />
                    {certi != null && <Table className="margin-top" striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Th??ng tin v??n b???ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>S??? hi???u</td>
                                <td>{certi.id}</td>
                            </tr>
                            <tr>
                                <td>H??? t??n</td>
                                <td>{certi.name}</td>
                            </tr>
                            <tr>
                                <td>Gi???i t??nh</td>
                                <td>{certi.gender}</td>
                            </tr>
                            <tr>
                                <td>Ng??y sinh</td>
                                <td>{certi.birthday}</td>
                            </tr>
                            <tr>
                                <td>Ng??y t???t nghi???p</td>
                                <td>{certi.completeday}</td>
                            </tr>
                            <tr>
                                <td>Chuy??n ng??nh</td>
                                <td>{certi.spec}</td>
                            </tr>
                            <tr>
                                <td>X???p lo???i</td>
                                <td>{certi.grade}</td>
                            </tr>
                            <tr>
                                <td>N???i dung k??</td>
                                <td>
                                    {certi.signature && messageCerti.substring(0, 50) + " ..."}
                                    <br/>
                                    {certi.signature && <Button className="margin-top" onClick={() => { navigator.clipboard.writeText(messageCerti) }} variant="success">
                                        Sao ch??p th??ng ??i???p
                                    </Button>}
                                </td>
                            </tr>

                            <tr>
                                <td>Ch??? k?? x??c nh???n</td>
                                <td>
                                    {certi.signature == null ? "Ch??a k??" : certi.signature.substring(0, 50) + " ..."}
                                    <br/>
                                    {certi.signature && <Button className="margin-top" onClick={() => { navigator.clipboard.writeText(certi.signature) }} variant="success">
                                        Sao ch??p ch??? k??
                                    </Button>}
                                </td>
                            </tr>

                            <tr>
                                <td>T??nh tr???ng</td>
                                <td>
                                    {certi.signature == null && "Ch??a k??"}
                                    {certi.signature && (isValidCerti == true ? "H???p l???" : "Kh??ng h???p l???")}
                                </td>
                            </tr>
                        </tbody>
                    </Table>}

                    {searchFirstTime && certi == null && <Form.Label>V??n b???ng kh??ng t???n t???i</Form.Label>}


                </Form.Group>
            </Form>
        </div>
    );
}

