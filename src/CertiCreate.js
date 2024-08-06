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
            window.alert("Please fill all the fields");
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
                    window.alert("Add new certificate successfully!");
                    window.location.reload();
                } else {
                    window.alert("Add new certificate failed!");
                }
            })
            .catch(error => console.log('error', error));
    }
    return <div className="App">
        <Form>
            <h2>Create cerificate</h2>
            <Row className="mb-3 margin-top">
                <Form.Group as={Col} controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Please enter name" onChange={e => setCertiName(e.target.value)} />

                </Form.Group>

                <Form.Group as={Col} controlId="formGender">
                    <Form.Label>Sex</Form.Label>
                    <Form.Select aria-label="Sex" onChange={e => setCertiGender(e.target.value === 1 ? "Male" : "Female")} >
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control placeholder="Birthday" onChange={e => setCertiBirthday(e.target.value)} />

                </Form.Group>

            </Row>


            <Row className="mb-3">
                <Form.Group as={Col} controlId="formcompeleteday">
                    <Form.Label>Graduation date</Form.Label>
                    <Form.Control placeholder="Graduation date" onChange={e => setCertiCompleteday(e.target.value)} />

                </Form.Group>

                <Form.Group as={Col} controlId="fromSpec">
                    <Form.Label>Specilization</Form.Label>
                    <Form.Select aria-label="Specilization" onChange={e => setCertiSpec(e.target.value === 1 ? "SE" : "CS")} >
                        <option value="1">SE</option>
                        <option value="2">CS</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGrade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Select aria-label="Grade" onChange={e => setCertiGrade(e.target.value === 1 ? "Good" : "Excellent")} >
                        <option value="1">Good</option>
                        <option value="2">Excellent</option>
                    </Form.Select>
                </Form.Group>
            </Row>
                <Button variant="primary" onClick={() => createCefti()}>
                    Save
                </Button>
        </Form>


    </div>



}