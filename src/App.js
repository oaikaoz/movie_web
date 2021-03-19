import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

//redux setup
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers/index";
import MoviePage from "./pages/MoviePage";
import PrivateRoute from "./guard/auth";
import Footer from "./components/Footer";
import EditMoviePage from "./pages/EditMoviePage";
import AddMoviePage from "./pages/AddMoviePage";

const store = createStore(rootReducer);
function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Router basename="/movie_web" >
          <div className="outer">
            <div className="inner">
              <Switch>
                <PrivateRoute exact path="/">
                  <MoviePage />
                </PrivateRoute>
                <PrivateRoute path="/edit/:id">
                  <EditMoviePage />
                </PrivateRoute>
                <PrivateRoute path="/add">
                  <AddMoviePage />
                </PrivateRoute>
                <Route path="/login">
                  <LoginPage />
                </Route>
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </Provider>
  );
}

export default App;
