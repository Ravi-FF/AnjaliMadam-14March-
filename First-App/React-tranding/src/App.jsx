
import State from "./Task/Task-2/State"
import Welcome from "./Task/Task-1/Welcome"
import StateExample1 from "./Task/StateExample1"
import Header from "./Task/Task-1/Header"
import StateTask from "./Task/StateTask"
import AllclassCompo from "./classComponent/AllclassCompo"
import StateTodo from "./Task/StateTodo"
import AllpropesExample from "./Propes/AllpropesExample"
import Main from "./Task/Task-3/Main"
import AllLocalStorage from "./LocalStorage/AllLocalStorage"
import MapCrud from "./Mapcrud/MapCrud"
import AllHookes from "./Hookes/AllHookes"
import FirstPage from "./Task/Task-4/FirstPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./ReactRouter/Home"
import About from "./ReactRouter/About"
import Blog from "./ReactRouter/Blog"
import HomeNevi from "./ReactRouter/UseNevigator/HomeNevi"
import BlogNevi from "./ReactRouter/UseNevigator/BlogNevi"
import AboutNevi from "./ReactRouter/UseNevigator/AboutNevi"
import LoginPage from "./ReactRouter/UseNevigator/USENAVIGATOREPLACE/LoginPage"
import LoginLocation from "./ReactRouter/UseLocation/UseLocationExapmle1/LoginLocation"
import UseLocationPage from "./ReactRouter/UseLocation/UseLocationExapmle1/UseLocationPage"
import InputPage from "./ReactRouter/UseLocation/UseLocationState/InputPage"
import OutPage from "./ReactRouter/UseLocation/UseLocationState/OutPage"
import PeraPage1 from "./ReactRouter/UsePerams/UseperaEx1/PeraPage1"
import PeraPage2 from "./ReactRouter/UsePerams/UseperaEx1/PeraPage2"
// import Router from "./Project/FakeJsonProject/Router"
import MaterialUiExample from "./MaterialUI/MaterialUiExample"
import FireRouter from "./FireBaseReactjs/FireBaseProject/FireRouter.jsx"
import ReduxRoute from "./Redux/ReduxRoute.jsx"

// import "./App.css"
function App() {
  return (

    <>
      {/* <Router /> */}
      {/* <Welcome /> */}
      {/* <State /> */}
      {/* <StateExample1></StateExample1> */}
      {/* <StateTask /> */}
      {/* <AllclassCompo /> */}
      {/* <StateTodo /> */}
      {/* <AllpropesExample /> */}
      {/* <Main /> */}
      {/* <AllLocalStorage /> */}
      {/* <MapCrud /> */}
      {/* <AllHookes /> */}
      {/* <FirstPage /> */}
      <FireRouter></FireRouter>
      {/* <MaterialUiExample /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
        </Routes>
      </BrowserRouter> */}

      {/* <BrowserRouter> */}
      {/* <Routes> */}
      {/* <Route path="/" element={<InputPage/>}></Route>
          <Route path="/output" element={<OutPage/>}></Route>
          <Route path="/locationPage" element={<UseLocationPage/>}></Route>
          <Route path="/aboutNevi" element={<BlogNevi />}></Route>
          <Route path="/blogNevi" element={<AboutNevi></AboutNevi>}></Route> */}

      {/* <Route path="/" element={<PeraPage1></PeraPage1>}></Route> */}
      {/* <Route path="/pera2/" element={<PeraPage2></PeraPage2>}></Route> */}

      {/* </Routes> */}
      {/* </BrowserRouter> */}
      {/* <ReduxRoute></ReduxRoute> */}
    </>
  )
}
export default App;