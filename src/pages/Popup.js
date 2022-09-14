import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateTweetRequest } from "../api";
import styles from "../styles/popup.module.css";
import { TOAST_CONFIG } from "../utils";

function Popup(props) {
  const { tweet, username, setRefreshValue } = props;
  const [message, setMessage] = useState(tweet.tweetMessage);

  const handleEditTweet = async () => {
    const res = await updateTweetRequest(username, tweet.id, message);
    props.close();
    toast.success("Tweet updated!!", TOAST_CONFIG);
    setRefreshValue();
  };

  return (
    <div className={styles.commentContainer}>
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
          <textarea
            className={styles.message}
            value={message}
            rows="2"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <input
        type="button"
        className={styles.editButton}
        onClick={() => handleEditTweet()}
        value="edit"
      />
    </div>
  );
}

export default Popup;
