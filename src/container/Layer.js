import { Container, Nav, Navbar } from "react-bootstrap";
import { NAVBAR } from "../resourse/resourseArray";
import { Link, Outlet } from "react-router-dom";

const Layer = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            {NAVBAR.map((ele, index) => {
              return (
                <Link to={ele.link} key={index}>
                  {ele.name}
                </Link>
              );
            })}
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layer;
