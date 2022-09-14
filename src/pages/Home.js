import { useEffect, useState } from "react";
import { useAuth, useTweets } from "../hooks";

import Loader from "../components/Loader";
import Popup from "./Popup";

import styles from "../styles/home.module.css";
import {
  addTweetRequest,
  deleteTweetByIdRequest,
  toggleLikeRequest,
} from "../api";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../utils";
import Reply from "./Reply";

function Home() {
  const [tweetString, setTweetString] = useState("");
  const [editTweet, setEditTweet] = useState(null);
  const [replyToTweet, setReplyToTweet] = useState(null);
  const auth = useAuth();
  const tweets = useTweets();

  // console.log(auth);
  // console.log(tweets);

  useEffect(() => {}, [editTweet]);

  const handleTweetBtn = async () => {
    const res = await addTweetRequest(auth.user.username, tweetString);
    // console.log(res.message);
    if (res.success) {
      toast.success("Posted successfully", TOAST_CONFIG);
      tweets.setRefreshValue();
      setTweetString("");
    } else {
      toast.error(res.message);
    }
  };

  const handleDeleteTweet = async (id) => {
    const res = await deleteTweetByIdRequest(auth.user.username, id);
    if (res.success) {
      console.log(res);

      toast.success(res.data.message, TOAST_CONFIG);

      tweets.setRefreshValue();
    } else {
      toast.error(res.message);
    }
  };

  const calculateTweetTiming = (tweet) => {
    let curTime = new Date();
    let hours = Math.abs(
      new Date(tweet.createdAt).getHours() - curTime.getHours()
    );
    let mins = Math.abs(
      new Date(tweet.createdAt).getMinutes() - curTime.getMinutes()
    );
    let secs = Math.abs(
      new Date(tweet.createdAt).getSeconds() - curTime.getSeconds()
    );
    if (hours == 0 && mins != 0) {
      return mins + " mins ago";
    } else if (mins == 0) {
      return secs + " secs ago";
    } else {
      return hours + " hrs ago";
    }
  };

  const getLikesCount = (tweet) => {
    let count = 0;
    for (let like of tweet.likes) {
      if (like.isActive === "Y") {
        count++;
      }
    }
    return count;
  };

  const getRepliesCount = (tweet) => {
    console.log(tweet);
    let count = 0;
    if (tweet && tweet.replies) {
      for (let like of tweet.replies) {
        count++;
      }
      return count;
    }
    return 0;
  };

  const handleToggleLike = async (tweetId) => {
    const res = await toggleLikeRequest(auth.user.username, tweetId);
    if (res.success) {
      tweets.setRefreshValue();
    }
  };

  const handleEditTweet = async (tweet) => {
    setEditTweet(tweet);
  };

  const handleReplyToTweet = async (tweet) => {
    setReplyToTweet(tweet);
  };

  const closePopup = () => {
    setEditTweet(null);
    setReplyToTweet(null);
  };

  if (tweets.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.homeContainer}>
      {editTweet && (
        <Popup
          close={() => closePopup()}
          tweet={editTweet}
          username={auth.user.username}
          setRefreshValue={() => tweets.setRefreshValue()}
        />
      )}

      {replyToTweet && (
        <Reply
          close={() => closePopup()}
          tweet={replyToTweet}
          username={auth.user.username}
          setRefreshValue={() => tweets.setRefreshValue()}
        />
      )}

      <div className={styles.tweetsContainer}>
        <div className={styles.userTweet}>
          <div className={styles.userWrapper}>
            <img
              className={styles.userImage}
              src="./assets/profile.png"
              height="70"
              width="70"
            />
            <p style={{ textAlign: "center" }}>{auth.user.username}</p>
          </div>
          <div className={styles.postWrapper}>
            <textarea
              rows="5"
              onChange={(e) => setTweetString(e.target.value)}
              value={tweetString}
            />
            <input
              type="button"
              value="Tweet"
              onClick={() => handleTweetBtn()}
            />
          </div>
        </div>
        {tweets.tweets.map((tweet, index) => {
          let chkboxId = "checkbox" +  index ;
          return (
            <div className={styles.tweetsRepliesWrapper} key={index}>
              <div className={styles.tweet}>
                <img
                  className={styles.tweetImage}
                  src="./assets/profile.png"
                  height="70"
                  width="70"
                />
                <div className={styles.detailsWrapper}>
                  <div className={styles.details}>
                    <span>@{tweet.username}</span>
                    <span>{tweet.name}</span>
                    <span>{calculateTweetTiming(tweet)}</span>
                  </div>
                  <div className={styles.message}>{tweet.tweetMessage}</div>
                  <div className={styles.optionsWrapper}>
                    {auth.user.username ? (
                      <>
                        <div className={styles.likesWrapper}>
                          <img
                            src="./assets/like.svg"
                            height="20"
                            width="20"
                            onClick={() => handleToggleLike(tweet.id)}
                          />
                          <span>{getLikesCount(tweet)}</span>
                        </div>
                        <div>
                          <img
                            src="./assets/comment.svg"
                            height="20"
                            width="20"
                            onClick={() => handleReplyToTweet(tweet)}
                          />
                          <span>{getRepliesCount(tweet)}</span>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {tweet.username === auth.user.username ? (
                      <>
                        <img
                          src="./assets/delete.svg"
                          height="20"
                          width="20"
                          onClick={() => handleDeleteTweet(tweet.id)}
                        />

                        <img
                          src="./assets/edit.svg"
                          height="25"
                          width="25"
                          onClick={() => handleEditTweet(tweet)}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src="./assets/delete.svg"
                          height="20"
                          width="20"
                          className={styles.disabled}
                        />

                        <img
                          src="./assets/edit.svg"
                          height="25"
                          width="25"
                          className={styles.disabled}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <input type="checkbox" id={chkboxId} />
              <div className={styles.labelWrapper}>
                <label htmlFor={chkboxId}>
                  <img src="./assets/arrow.svg" width="20" height="20" />
                </label>
              </div>
              <div className={styles.replies}>
                {tweet.replies.map((reply, index) => {
                  return <div key={index} className={styles.reply}>{reply.replyMessage}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
