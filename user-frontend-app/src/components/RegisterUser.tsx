import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import { UserService } from "../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastUtil } from "../utils/ToastUtil";

const RegisterUser: React.FC = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: "",
    designation: "",
    gender: "",
    bio: "",
    terms: false,
  });

  const onInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onInputTerms = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.checked,
    });
  };
  useEffect(() => {
    if (id) {
      UserService.getUserById(id)
        .then((response) => {
          setUser({
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            designation: response.data.designation,
            gender: response.data.terms,
            bio: response.data.bio,
            terms: response.data.terms,
          });
        })
        .catch();
    }
  }, [id]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(user);
    if (id) {
      UserService.updateUser(id, user)
        .then((response) => {
          if (response && response.data) {
            navigate("/users");
            ToastUtil.displaySuccessToast("User Successfully Updated..!");
          }
        })
        .catch((error) => {
          ToastUtil.displayErrorToast(error.message);
        });
    } else {
      UserService.registerUser(user)
        .then((response) => {
          if (response && response.data) {
            navigate("/users");
            ToastUtil.displaySuccessToast("User Successfully Registered..!");
          }
        })
        .catch((error) => {
          ToastUtil.displayErrorToast(error.message);
        });
    }
  };

  const pageTitle = () => {
    if (id) {
      return <p className="h2 text-center text-white">Edit Page</p>;
    } else {
      return <p className="h2 text-center ">Registration Page</p>;
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <div className="card col-md-4 offset-md-4 shadow-lg">
              <div className="card-header bg-warning">{pageTitle()}</div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      value={user.username}
                      onChange={onInputChange}
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      value={user.email}
                      onChange={onInputChange}
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      value={user.password}
                      onChange={onInputChange}
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <select
                      value={user.designation}
                      onChange={onInputChange}
                      name="designation"
                      className="form-control"
                    >
                      <option value="">Select Designation</option>
                      <option value="Software Engineer">
                        Software Engineer
                      </option>
                      <option value="Sr. Software Engineer">
                        Sr. Software Engineer
                      </option>
                      <option value="Tech Lead">Tech Lead</option>
                    </select>
                  </div>

                  <div className="mt-2">
                    <label className="ms-2">Gender</label>
                    <input
                      value={"Male"}
                      onChange={onInputChange}
                      name="gender"
                      type="radio"
                      className="ms-2"
                    />
                    <label>Male</label>

                    <input
                      value={"Female"}
                      onChange={onInputChange}
                      name="gender"
                      type="radio"
                      className="ms-2"
                    />
                    <label>Female</label>
                  </div>

                  <div className="mt-2">
                    <textarea
                      value={user.bio}
                      onChange={onInputChange}
                      name="bio"
                      className="form-control"
                      placeholder="Biography"
                      rows={3}
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      checked={user.terms}
                      onChange={onInputTerms}
                      name="terms"
                      type="checkbox"
                      className="ms-1"
                    />
                    <label className="ms-2">Accepts Terms & Conditions</label>
                  </div>

                  <div className="mt-2">
                    <input
                      type="submit"
                      value="Submit"
                      className="form-control btn btn-warning"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
