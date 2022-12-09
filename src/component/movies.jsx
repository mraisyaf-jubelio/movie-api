import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { getData } from "./api";
import "./movie.css";
import { logout } from "./api";

const Movie = () => {
  const [movies, setmovies] = useState([]);
  useEffect(() => {
    getData().then((result) => {
      setmovies(result);
    });
  }, []);

  return (
    <div className="page">
      <Container>
        <Navbar expand="lg" className="navbar-color">
          <Container>
            <Navbar.Brand href="/movie" className="text-white">
              Movie
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto justify-content-end" style={{ width: "100%" }}>
                <NavDropdown
                  title={<span className="text-white fw-bolder">{localStorage.getItem("name")}</span>}
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#action/3.1" onClick={logout}>
                    Logout{" "}
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Row className="justify-content-center gap">
          {movies.map((film, i) => {
            return (
              <Col sm={4} key={i} className="mt-4 mb-4">
                <p className="text-center text-white">ID Film {film.id}</p>
                <Card style={{ textAlign: "center" }}>
                  <Card.Img variant="top" src={`${process.env.REACT_APP_IMG}${film.poster_path}`} />
                  <Card.Body>
                    <Card.Title className="fw-bold">{film.title}</Card.Title>
                    <Card.Text className="font">{film.overview}</Card.Text>
                    <div className="d-flex justify-content-center ">
                      <p className="me-1 text-primary fw-bolder">{film.popularity}</p>
                      <p>Watched</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
