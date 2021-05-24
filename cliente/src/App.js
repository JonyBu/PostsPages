import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./components/home";
import Detalle from "./components/detalle";
import Formulario from "./components/formulario";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/detalle/:id" component={Detalle} />
        <Route path="/formulario/:id" component={Formulario} />
      </Switch>
    </Router>
  );
}

export default App;
