import React, { useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import { useParams } from "react-router-dom";
import { UserService } from "../services/UserService";
import Spinner from "./Spinner";

interface IState {
  user: IUser;
  loading: boolean;
  errorMessage: string;
}

const ViewUser: React.FC = () => {
  let { id } = useParams();

  let [state, setState] = useState<IState>({
    user: {} as IUser,
    loading: false,
    errorMessage: "",
  });

  const getUserById = () => {
    setState({ ...state, loading: true });
    if (id) {
      UserService.getUserById(id)
        .then((response) => {
          setState({
            ...state,
            user: response.data,
            loading: false,
          });
        })
        .catch((error) => {
          setState({
            ...state,
            loading: false,
            errorMessage: error.message,
          });
        });
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  let { user, loading, errorMessage } = state;

  return (
    <>
    {loading && <Spinner/>}
      {user && Object.keys(user).length > 0 ? (
        <div className="container mt-3">
          {/* <h3>{JSON.stringify(user)}</h3> */}
          <div className="row">
            <div className="col">
              <div className="card col-md-6 offset-md-3 shadow-lg">
                <div className="card-header bg-success">
                  <h2 className="text-center text-white">User Details</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table tableData ms-5">
                    <tr>
                      <th>User-Id</th>
                      <td>{user.userId}</td>
                    </tr>

                    <tr>
                      <th>User-Name</th>
                      <td>{user.username}</td>
                    </tr>

                    <tr>
                      <th>Email-Id</th>
                      <td>{user.email}</td>
                    </tr>

                    <tr>
                      <th>DESIGNATION</th>
                      <td>{user.designation}</td>
                    </tr>

                    <tr>
                      <th>GENDER</th>
                      <td>{user.gender}</td>
                    </tr>

                    <tr>
                      <th>BIOGRAPHY</th>
                      <td>{user.bio}</td>
                    </tr>

                    <tr>
                      <th>TERMS</th>
                      <td>{user.terms ? "YES" : "NO"}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-center text-danger">User Not Found</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUser;
