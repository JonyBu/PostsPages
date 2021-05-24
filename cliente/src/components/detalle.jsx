import React, { useState, useEffect } from "react";
import axios from "axios";

function Detalle(props) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  const [id] = useState(props.match.params.id);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (err) {
        setError(err.message)
      });
    }, []
  
  );

  return (
    error !== undefined? 
    <div className="mt-5">
      <h3 className=" text-center">{error}</h3>
    </div>
    :
    <div className="card border-dark m-3"  >
      <div class="card-header">
        <h5 className="card-title">{posts.title}</h5>
      </div>
      <div className="card-body text-dark">
        <p class="card-text">{posts.body}</p>
      </div>
      <div className="card-footer">user: {posts.userId} - postID: {posts.id}</div>
    </div>
  );
}

export default Detalle;
