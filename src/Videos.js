const Videos = (props) => {
  const upvoteClickHandler = (index) => {
    props.upvote(index);
  };

  const downvoteClickHandler = (index) => {
    props.downvote(index);
  };

  return (
    <section className="gen-section-padding-2">
      <div className="container">
        <div className="row mt-3">
          {props.videos.map((video) => (
            <div className="col-4">
              <div className="gen-style-2">
                <div
                  className=""
                  data-dots="false"
                  data-nav="true"
                  data-desk_num={4}
                  data-lap_num={3}
                  data-tab_num={2}
                  data-mob_num={1}
                  data-mob_sm={1}
                  data-autoplay="false"
                  data-loop="false"
                  data-margin={30}
                >
                  <div className="item">
                    <div className="movie type-movie status-publish has-post-thumbnail hentry movie_genre-action movie_genre-adventure movie_genre-drama">
                      <div className="gen-carousel-movies-style-2 movie-grid style-2">
                        <div className="gen-movie-contain">
                          <div className="gen-movie-img">
                            <img
                              src="images/background/asset-3.jpg"
                              alt="owl-carousel"
                            />
                            <div className="gen-movie-add">
                              <ul className="menu bottomRight">
                                <li
                                  onClick={() =>
                                    upvoteClickHandler(video.index)
                                  }
                                  className="share top"
                                >
                                  <i className="fa fa-thumbs-up" />
                                </li>
                              </ul>
                              <ul className="menu bottomRight">
                                <li
                                  onClick={() =>
                                    downvoteClickHandler(video.index)
                                  }
                                  className="share top"
                                >
                                  <i className="fa fa-thumbs-down" />
                                </li>
                              </ul>
                            </div>
                            <div className="gen-movie-action">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href={video.link}
                                className="gen-button playBut popup-youtube popup-vimeo popup-gmaps"
                              >
                                <i className="fa fa-play" />
                              </a>
                            </div>
                          </div>
                          <div className="gen-info-contain">
                            <div className="gen-movie-info">
                              <h3>
                                <p>{video.title} <br />By: {video.owner}</p>
                              </h3>
                            </div>
                            <div className="gen-movie-meta-holder">
                              <ul>
                                <li>{video.upvote} Like(s)</li>
                                <li>{video.downvote} DisLike(s)</li>
                              </ul>
                            </div>
                            <div className="gen-movie-meta-holder">
                              <p>{video.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* #post-## */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
