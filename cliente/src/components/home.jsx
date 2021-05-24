import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function eliminar(idPost) {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${idPost}`);
    const postsUpdated = posts.filter(({ id }) => id !== idPost);
    setPosts(postsUpdated);
  }

  return (
    <div className="card-body">
      <table className="table">
        {posts.map((post) => {
          return (
            <tbody key={post.id}>
              <tr>
                <td>{post.title}</td>
                <td>
                  {
                    <Link to={{ pathname: `/detalle/${post.id}` }}>
                      <button className="btn btn-outline-dark btn-sm ">
                        VER
                      </button>
                    </Link>
                  }
                </td>
                <td>
                  {
                    <Link to={{ pathname: `/formulario/${post.id}` }}>
                      <button className="btn btn-outline-dark btn-sm ">
                        EDITAR
                      </button>
                    </Link>
                  }
                </td>
                <td>
                  {
                    <button
                      className="btn btn-outline-danger btn-sm "
                      onClick={() => eliminar(post.id)}
                    >
                      ELIMINAR
                    </button>
                  }
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Home;
