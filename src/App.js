import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layer from "./container/Layer";
import { ROUTES } from "./resourse/resourseArray";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layer />}>
          {ROUTES.map((ele, index) => {
            return (
              <Route path={ele.link} element={ele.component} key={index} />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
