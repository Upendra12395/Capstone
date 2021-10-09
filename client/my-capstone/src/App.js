import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import User from "./components/Login/User";
import Login from "./components/Login/Login";
import Builder from "./components/Login/Builder";
import ImageSlider from "./components/HomeSlider/ImageSlider";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Login/Signup";
import Services from "./components/Services/Services";

import UserDashboard from "./components/UserDashboard/UserDashboard";
import UsrPrfl from "./components/UserDashboard/UsrPrfl";
import Projects from "./components/UserDashboard/Projects";
import Post from "./components/UserDashboard/Post";
import Notifications from "./components/UserDashboard/Notifications";
import Chats from "./components/UserDashboard/Chats";

import BuilderDashboard from "./components/BuilderDashboard/BuilderDashboard";
import BuilderProfile from "./components/BuilderDashboard/BuilderProfile";
import Available from "./components/BuilderDashboard/Available";
import MyBids from "./components/BuilderDashboard/MyBids";
function App() {
  return (
    <div className="cap-body">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/home" component={ImageSlider}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/user" component={User}></Route>
          <Route exact path="/builder" component={Builder}></Route>
        </Switch>
      </Router>

      <Router>
        <Route exact path="/userdashboard" component={UserDashboard} />

        <Route exact path="/usrprfl" component={UsrPrfl} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/chats" component={Chats} />
      </Router>

      <Router>
        <Route exact path="/builderdashboard" component={BuilderDashboard} />

        <Route exact path="/builderprofile" component={BuilderProfile} />
        <Route exact path="/projects" component={MyBids} />
        <Route exact path="/post" component={Available} />
        <Route exact path="/Bnotifications" component={Notifications} />
        <Route exact path="/Bchats" component={Chats} />
      </Router>
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
