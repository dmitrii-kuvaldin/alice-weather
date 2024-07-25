import "./index.css";
import ReactDOM from "react-dom/client";
import Layout from "./components/layout/Layout";
import Form from "./components/form/Form";
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from "./components/Homepage/Homepage";
import Error from "./components/Error/Error";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/weathers" element={<Form />} />
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </HashRouter>
);
