import React from 'react';
import AppNavbar from './components/AppNavbar';
import CarouselPage from './components/Carousel';
import Features from './components/Features';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import FarmersAskFarmers from './components/FarmersAskFarmers';
import Infos from './components/Infos';
import QuestionModal from './components/QuestionModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Soil from './components/Soil';
import Crop from './components/Crop';
import Schemes from './components/Schemes';

import ModernFarming from './components/ModernFarming';

import SideIncome from './components/SideIncome';
import Scroll from './components/Scroll';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <AppNavbar />
              <CarouselPage />
              <Features />
              <Testimonial />
              <Scroll />
              <Footer />
            </Route>

            <Route path="/community" exact>
              <AppNavbar />
              <QuestionModal />
              <FarmersAskFarmers />
              <Scroll />
              <Footer />
            </Route>
            <Route path="/community/answer" exact>
              <AppNavbar />
              <Infos />
              <Scroll />
              <Footer />
            </Route>
            <Route path="/soil">
              <AppNavbar />
              <Soil />
              <Scroll />
              <Footer />
            </Route>
            <Route path="/schemes">
              <AppNavbar />
              <Schemes />
              <Scroll />
              <Footer />
            </Route>
            <Route path="/modern">
              <AppNavbar />
              <ModernFarming />
              <Scroll />
              <Footer />
            </Route>
            <Route path="/sideIncome">
              <AppNavbar />
              <SideIncome />
              <Scroll />
              <Footer />
            </Route>
            <Route path="/crop">
              <AppNavbar />
              <Crop />
              <Scroll />
              <Footer />
            </Route>
            <Route path="/suggest" exact>
              <AppNavbar />

              <Scroll />
              <Footer />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
