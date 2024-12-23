import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useMatch,
} from "react-router-dom";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import Movies from "./Components/Movies";
import Categories from "./Components/Categories";

export default function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Go Watch a Movie!</h1>
          <hr className="mb-3"></hr>
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/by-category">Categories</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin">Manage Catalogue</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/movies/:id" element={<Movie />} />
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/by-category" element={<CategoryPage />} />
              <Route
                path="/by-category/drama"
                element={<Categories title="Drama" />}
              />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

function Movie() {
  let { id } = useParams();

  return <h2>Movie ID: {id}</h2>;
}

function CategoryPage() {
  let match = useMatch("/by-category/*");

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        <li>
          <Link to={`${match.pathnameBase}/comedy`}>Comedy</Link>
        </li>
        <li>
          <Link to={`${match.pathnameBase}/drama`}>Drama</Link>
        </li>
      </ul>
    </div>
  );
}
