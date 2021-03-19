import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { BsPencil, BsTrash, BsFillPlusSquareFill } from "react-icons/bs";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";
import { useToasts } from "react-toast-notifications";

const MoviePage = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [movie, setMovie] = React.useState([]);
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  const ProfileRedux = useSelector((state) =>
    JSON.parse(state.authReducer.profile)
  );

  const getMovie = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/movie/`;
    const resp = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMovie(resp.data.data);
  };

  React.useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      {ProfileRedux && (
        <>
          <Row>
            <Col sm={10}>
              <h2>{ProfileRedux.username}</h2>
            </Col>

            <Col sm={2}>
              <Button
                variant="danger"
                onClick={() => {
                  localStorage.removeItem("profile");
                  localStorage.removeItem("token");
                  dispatch(updateProfile(null));
                  addToast("ออกจากระบบเรียบร้อยแล้ว", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                  });
                  history.push(`/login`);
                }}
              >
                Logout
              </Button>
            </Col>
          </Row>
          <hr />
        </>
      )}
      {ProfileRedux && ProfileRedux.role == "TEAMLEADER" && (
        <Button
          className="mb-2"
          variant="dark"
          onClick={() => {
            history.push(`/add/`);
          }}
        >
          <BsFillPlusSquareFill /> Add
        </Button>
      )}
      <Table striped bordered hover size="xl" variant="dark" size="100">
        <thead>
          <tr>
            <th># </th>
            <th>Title</th>
            <th>Year Released</th>
            <th>Rating</th>
            <th> Manage </th>
          </tr>
        </thead>
        <tbody>
          {movie.map((v, i) => {
            return (
              <tr key={v.id}>
                <td>{i + 1}</td>
                <td>{v.title}</td>
                <td>{v.release_year}</td>
                <td>{v.rating}</td>
                <td>
                  {ProfileRedux && ProfileRedux.role == "MANAGER" && (
                    <>
                      <Button
                        className="ml-2"
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                          history.push(`/edit/${v.id}`);
                        }}
                      >
                        <BsPencil />
                      </Button>
                      <Button
                        className="ml-2"
                        variant="outline-danger"
                        size="sm"
                        onClick={async () => {
                          const isConfirm = window.confirm(
                            "ต้องการลบข้อมูล " + v.title + "?"
                          );
                          if (isConfirm) {
                            const resp = await axios.delete(
                              `${process.env.REACT_APP_API_URL}/movie/${v.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            );

                            addToast(resp.data.message, {
                              appearance: "success",
                              autoDismiss: true,
                              autoDismissTimeout: 3000,
                            });
                            getMovie();
                          }
                        }}
                      >
                        <BsTrash />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default MoviePage;
