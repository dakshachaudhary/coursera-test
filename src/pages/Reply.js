import { useState } from "react";
import { toast } from "react-toastify";
import { replyToTweetRequest } from "../api";
import styles from "../styles/reply.module.css";
import { TOAST_CONFIG } from "../utils";

function Reply(props) {
  const [msg, setMsg] = useState("");

  const { tweet, username, setRefreshValue } = props;
  const [message, setMessage] = useState(tweet.tweetMessage);

  const handleReplyTweet = async () => {
    const res = await replyToTweetRequest(username, tweet.id, msg);
    props.close();
    toast.success("Successfully replied to the tweet!!", TOAST_CONFIG);
    setRefreshValue();
  };

  return (
    <div className={styles.replyContainer}>
      <button onClick={() => props.close()}>X</button>
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
            {/* <span>{calculateTweetTiming(tweet)}</span> */}
          </div>

          <div className={styles.message}>{tweet.tweetMessage}</div>
        </div>
      </div>
      <div className={styles.userReplyWrapper}>
        <img
          className={styles.tweetImage}
          src="./assets/profile.png"
          height="70"
          width="70"
        />
        <div className={styles.detailsWrapper}>
          <div className={styles.details}>
            <span>
              <span style={{ color: "grey" }}>Replying to</span> @
              {tweet.username}
            </span>
          </div>
          <input
            onChange={(e) => setMsg(e.target.value)}
            className={styles.inputMessage}
            placeholder="Tweet your reply"
          />
        </div>
      </div>
      <input
        type="button"
        className={styles.replyButton}
        onClick={() => handleReplyTweet()}
        value="reply"
      />
    </div>
  );
}

export default Reply;
