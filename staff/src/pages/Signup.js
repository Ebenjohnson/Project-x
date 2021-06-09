import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from '../features/User/UserSlice';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../assets/fonts/icomoon/style.css"
import "../assets/css/bootstrap.min.css"
import "../assets/css/style.css"
import bg from "../assets/images/bg_1.jpg"
import loaderSpin from "../assets/images/loader.svg"
import {APP_NAME} from "../config/app";

const Signup = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push('/');
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
      <div className="d-lg-flex half">
          <div className="contents order-2 order-md-1">
              <div className="container">
                  <div className="row align-items-center justify-content-center">
                      <div className="col-md-9">
                          <h3><strong>Register</strong></h3>
                          <br/>
                          <form onSubmit={handleSubmit(onSubmit)}
                                method="POST">
                              <div className="form-group first">
                                  <label htmlFor="firstname">Firstname</label>
                                  <input className="form-control"
                                         id="firstname"
                                         name="name"
                                         type="text"
                                         autoComplete="firstname"
                                         ref={register({ required: true })}
                                         required
                                  />
                              </div>
                              <div className="form-group first">
                                  <label htmlFor="lastname">Lastname</label>
                                  <input className="form-control"
                                         id="lastname"
                                         name="lastname"
                                         type="text"
                                         autoComplete="lastname"
                                         ref={register({ required: true })}
                                         required
                                  />
                              </div>
                              <div className="form-group first">
                                  <label htmlFor="username">Email</label>
                                  <input className="form-control"
                                         id="email"
                                         name="email"
                                         type="email"
                                         autoComplete="email"
                                         ref={register({
                                             pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                         })}
                                         required
                                  />
                              </div>
                              <div className="form-group last mb-3">
                                  <label htmlFor="password">Password <small>(Min. 6 caracters)</small></label>
                                  <input className="form-control"
                                         id="password"
                                         name="password"
                                         type="password"
                                         ref={register({ required: true })}
                                         autoComplete="current-password"
                                         required
                                  />
                              </div>
                              <div className="form-group last mb-3">
                                  <label htmlFor="confpassword">Confirm Password <small>(Min. 6 caracters)</small></label>
                                  <input className="form-control"
                                         id="confpassword"
                                         name="confpassword"
                                         type="password"
                                         ref={register({ required: true })}
                                         autoComplete="current-password"
                                         required
                                  />
                              </div>


                              <button type="submit"  className="btn btn-block btn-info" >
                                  {isFetching ? (
                                      <img src={loaderSpin} alt="" />
                                  ) : null}
                                 Register
                              </button>
                          </form>
                          <br/>
                          <p className="text-center"><strong>OR</strong></p>
                          <p className="text-center">   <Link to="login"  className="justify-content-center">Login</Link></p>

                      </div>
                  </div>
              </div>
          </div>
          <div className="bg order-1 order-md-2" style= {{backgroundImage : `url('${bg}')`}}></div>
      </div>
  );
};

export default Signup;
