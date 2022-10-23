import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect} from 'react';
import { CertiSearch } from './CertiSearch'
import { CertiCreate } from './CertiCreate'
import { CertiAdmin } from './CertiAdmin'
import { CertiHome } from './CertiHome'
import { CertiSign } from './CertiSign'
import { Navbar, Nav, Container, Carousel } from 'react-bootstrap'
import { HOST, PORT } from './constant'
const App = () => {
  // useEffect(() => {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
    
  //   fetch(`http://${HOST}:${PORT}/dilithium`, requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }, [])
  return (

    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">Trang chủ</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="search">Tìm kiếm văn bằng</Nav.Link>
              <Nav.Link href="create">Tạo văn bằng</Nav.Link>
              <Nav.Link href="admin">Quản lý văn bằng</Nav.Link>
              <Nav.Link href="sign">Ký văn bằng</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>

        <Route exact path="/" element={<CertiHome />} />
        <Route exact path="/home" element={<CertiHome />} />
        <Route exact path="/search" element={<CertiSearch />} />
        <Route exact path="/create" element={<CertiCreate />} />
        <Route exact path="/admin" element={<CertiAdmin />} />
        <Route exact path="/sign" element={<CertiSign />} />
      </Routes>
      <div className="App"></div>
    </Router >
  );
}
export default App;