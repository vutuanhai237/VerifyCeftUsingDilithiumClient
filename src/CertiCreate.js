import './App.css'
import { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

import {
    HOST, PORT
} from './constant'

export const CertiCreate = () => {
    const [ceftiName, setCertiName] = useState("")
    const [ceftiGender, setCertiGender] = useState("Nam")
    const [ceftiBirthday, setCertiBirthday] = useState("")
    const [ceftiSpec, setCertiSpec] = useState("SE")
    const [ceftiGrade, setCertiGrade] = useState("Good")
    const [ceftiCompleteday, setCertiCompleteday] = useState("")
    const createCefti = () => {
        if (ceftiName === "" || ceftiBirthday === "" || ceftiCompleteday === "") {
            window.alert("Hãy nhập đầy đủ các thông tin");
            return;
        }


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "type": "STD",
            "name": ceftiName,
            "gender": ceftiGender,
            "birthday": ceftiBirthday,
            "spec": ceftiSpec,
            "grade": ceftiGrade,
            "completeday": ceftiCompleteday,
            "signature": null,
            "signed": false
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://${HOST}:${PORT}/certificate/`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                if (result != null) {
                    window.alert("Thêm mới văn bằng thành công");
                    window.location.reload();
                } else {
                    window.alert("Thêm mới văn bằng thất bại");
                }
            })
            .catch(error => console.log('error', error));
    }
    return <div className="App">
        <Form>
            <h2>Tạo văn bằng</h2>
            <Row className="mb-3 margin-top">
                <Form.Group as={Col} controlId="formName">
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control placeholder="Nhập tên" onChange={e => setCertiName(e.target.value)} />

                </Form.Group>

                <Form.Group as={Col} controlId="formGender">
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Select aria-label="Giới tính" onChange={e => setCertiGender(e.target.value === 1 ? "Nam" : "Nữ")} >
                        <option value="1">Nam</option>
                        <option value="2">Nữ</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formBirthday">
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control placeholder="Ngày sinh" onChange={e => setCertiBirthday(e.target.value)} />

                </Form.Group>

            </Row>


            <Row className="mb-3">
                <Form.Group as={Col} controlId="formcompeleteday">
                    <Form.Label>Ngày tốt nghiệp</Form.Label>
                    <Form.Control placeholder="Điền ngày tốt nghiệp" onChange={e => setCertiCompleteday(e.target.value)} />

                </Form.Group>

                <Form.Group as={Col} controlId="fromSpec">
                    <Form.Label>Chuyên ngành</Form.Label>
                    <Form.Select aria-label="Chuyên ngành" onChange={e => setCertiSpec(e.target.value === 1 ? "SE" : "CS")} >
                        <option value="1">SE</option>
                        <option value="2">CS</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGrade">
                    <Form.Label>Xếp loại</Form.Label>
                    <Form.Select aria-label="Xếp loại" onChange={e => setCertiGrade(e.target.value === 1 ? "Good" : "Excellent")} >
                        <option value="1">Good</option>
                        <option value="2">Excellent</option>
                    </Form.Select>
                </Form.Group>
            </Row>
                <Button variant="primary" onClick={() => createCefti()}>
                    Lưu
                </Button>
        </Form>


    </div>



}