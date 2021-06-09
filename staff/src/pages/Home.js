import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchUserBytoken, clearState } from '../features/User/UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import Header from "../components/Header";
import {APP_NAME} from "../config/app";
import Booking from "./Booking";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Invoice from "./Invoice";
import Setting from "./Setting";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";



const Home = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(userSelector);
  useEffect(() => {
    dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }));
  }, []);

  const { username, email } = useSelector(userSelector);


  useEffect(() => {
      document.title = APP_NAME+" | Shop"
    if (isError) {
      dispatch(clearState());
     history.push('/login');
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem('token');

    history.push('/login');
  };


  return (
      <div>
      {isFetching ? (
              <div className="container mx-auto">
               <Loader type="Puff" color="#00BFFF" height={100} width={100}  className="homeLoader"/>
              </div>
      ) : (
        <div className="homepage">
          <Header username={username}  onLogOut = {onLogOut}/>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/settings"  >
                   <Setting username={username} email={email} />
                </Route>
                <Route exact path="/booking" component={Booking} />
                <Route exact path="/invoice" component={Invoice}/>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>

        </div>
      )}
    </div>
  );
};

export default Home;
