import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Upload = (props) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const formHandler = (event) => {
    event.preventDefault();

    props.addVideo(title, link, description);
    setTitle('');
    setLink('');
    setDescription('');
    history.push('/');
  };
  return (
    <section className="position-relative pb-0">
      <div
        className="gen-login-page-background"
        style={{ backgroundImage: 'url("images/background/asset-54.jpg")' }}
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <form onSubmit={formHandler} name="pms_login" id="pms_login">
                <h4>Upload Video</h4>
                <p className="login-username">
                  <label htmlFor="user_login">Title</label>
                  <input
                    value={title}
                    type="text"
                    name="log"
                    id="user_login"
                    className="input"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </p>
                <p className="login-username">
                  <label htmlFor="user_login">Link to Video</label>
                  <input
                    value={link}
                    type="text"
                    name="log"
                    id="user_login"
                    className="input"
                    onChange={(e) => setLink(e.target.value)}
                  />
                </p>
                <p className="login-username">
                  <label htmlFor="user_login">
                    What do you like about this Video?
                  </label>
                  <textarea
                    value={description}
                    type="text"
                    name="log"
                    id="user_login"
                    className="input"
                    size={20}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </p>
                <p className="login-submit">
                  <input
                    type="submit"
                    name="wp-submit"
                    id="wp-submit"
                    className="button button-primary"
                  />
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upload;
