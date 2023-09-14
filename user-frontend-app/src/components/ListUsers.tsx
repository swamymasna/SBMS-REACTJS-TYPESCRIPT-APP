import React, { useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import { UserService } from "../services/UserService";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { ToastUtil } from "../utils/ToastUtil";

interface IState {
  users: IUser[];
  loading: boolean;
  errorMessage: string;
}

const ListUsers: React.FC = () => {
  const [state, setState] = useState<IState>({
    users: [] as IUser[],
    loading: false,
    errorMessage: "",
  });

  const findAllUsers = () => {
    setState({ ...state, loading: true });
    UserService.getAllUsers()
      .then((response) => {
        setState({
          ...state,
          users: response.data,
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
  };

  useEffect(() => {
    findAllUsers();
  }, []);

  const deleteUser = (id: any) => {
    UserService.removeUser(id)
      .then((response) => {
        findAllUsers();
        ToastUtil.displayInfoToast("User Successfully Deleted..!");
      })
      .catch((error) => {
        ToastUtil.displayErrorToast(error.message);
      });
  };

  let { users, loading, errorMessage } = state;

  return (
    <>
      {loading && <Spinner />}
      {users.length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <div className="card shadow-lg ">
                <div className="card-header bg-primary">
                  <p className="h2 text-center text-white">Users List Data</p>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover tableData">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>USER-NAME</th>
                        <th>EMAIL-ID</th>
                        <th>DESIGNATION</th>
                        <th>GENDER</th>
                        {/* <th>BIOGRAPHY</th> */}
                        <th>TERMS</th>
                        <th className="text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => {
                        return (
                          <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.designation}</td>
                            <td>{ user.gender ? 'Male' : 'Female'}</td>
                            {/* <td>{user.bio}</td> */}
                            <td>{user.terms ? "YES" : "NO"}</td>
                            <td className="text-center">
                              <Link
                                to={`/edit-user/${user.userId}`}
                                className="btn btn-success"
                              >
                                Update
                              </Link>
                              <button
                                onClick={() => deleteUser(user.userId)}
                                className="btn btn-danger ms-2"
                              >
                                Delete
                              </button>
                              <Link
                                to={`/view-user/${user.userId}`}
                                className="btn btn-info ms-2"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
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
              <p className="h3 text-center text-danger">
                User Records Not Found
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListUsers;
