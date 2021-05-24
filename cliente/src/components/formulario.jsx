import React, { useState, useEffect , useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Formulario(props) {
  const { register, handleSubmit } = useForm();
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [idPost] = useState(props.match.params.id);
  const [es, setEs] = useState();

  const estado = useCallback( () => {
    idPost === "0" ? setEs("nuevo agregado") : setEs("editado");
  })

  useEffect(() => {
    estado()
  }, [estado]);

  const onSubmit = (data) => {
    idPost === "0"
      ? axios
          .post("https://jsonplaceholder.typicode.com/posts", data)
          .then(function (response) {
            setPosts(response.data);
            setSuccess(true);
          })
          .catch(function (error) {
            console.log(error);
          })
      : axios
          .put(`https://jsonplaceholder.typicode.com/posts/${idPost}`, data)
          .then(function (response) {
            setPosts(response.data);
            setSuccess(true);
          })
          .catch(function (error) {
            console.log(error);
          });
  };

  return success ? (
    <div className="card border-success m-3">
      <div class="card-header">
        <h5 className="card-title">{posts.title}</h5>
      </div>
      <div className="card-body text-dark">
        <p class="card-text">{posts.body}</p>
      </div>
      <div className="card-footer text-success">
        Post {es} correctamente id: {posts.id}
      </div>
    </div>
  ) : (
    <form className="container mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          User ID
        </label>
        <input
          type="number"
          className="form-control"
          id="userId"
          name="userId"
          ref={register({ min: 1, max: 100 })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title Post
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
          name="title"
          ref={register({ required: true, maxLength: 20 })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Contenido
        </label>
        <textarea
          className="form-control"
          placeholder="Leave a body post here"
          id="body"
          name="body"
          ref={register({ required: true, minLength: 5 })}
          // ref={register({ pattern: /^[A-Za-z]+$/i })}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Formulario;
