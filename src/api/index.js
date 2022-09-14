import {
  API_URLS,
  getItemFromLocalStorage,
  LOCAL_STORAGE_TOKEN_KEY,
} from "../utils/index";

const customFetch = async (url, customConfig) => {
  //   const config = {
  //     ...customConfig,
  //     headers: {
  //       ...customConfig.headers,
  //     },
  //   };

  try {
    const response = await fetch(url, customConfig);

    const data = await response.json();
    // console.log(response);
    if (response.status === 200) {
      return {
        data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const loginRequest = (username, password) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    // mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

const registerRequest = (
  firstName,
  lastName,
  email,
  username,
  password,
  contactNumber
) => {
  return customFetch(API_URLS.register(), {
    method: "POST",
    // mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      username,
      password,
      contactNumber,
    }),
  });
};

const getAllTweetsRequest = () => {
  return customFetch(API_URLS.allTweets(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

const addTweetRequest = (username, tweetString) => {
  return customFetch(API_URLS.addTweet(username), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getItemFromLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify({
      username,
      tweetString,
    }),
  });
};

const deleteTweetByIdRequest = (username, id) => {
  return customFetch(API_URLS.deleteTweet(username, id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getItemFromLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY
      )}`,
    },
  });
};

const toggleLikeRequest = (username, tweetId) => {
  return customFetch(API_URLS.toggleLike(username, tweetId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getItemFromLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY
      )}`,
    },
  });
};

const allUsersRequest = () => {
  return customFetch(API_URLS.allUsers(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getItemFromLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY
      )}`,
    },
  });
};

const updateTweetRequest = (username, tweetId, tweetString) => {
  return customFetch(API_URLS.updateTweet(username, tweetId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getItemFromLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify({
      tweetString,
    }),
  });
};

const replyToTweetRequest = (username, tweetId, tweetString) => {
  return customFetch(API_URLS.replyToTweet(username, tweetId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getItemFromLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify({
      tweetString,
    }),
  });
};

export {
  loginRequest,
  registerRequest,
  getAllTweetsRequest,
  addTweetRequest,
  deleteTweetByIdRequest,
  updateTweetRequest,
  toggleLikeRequest,
  allUsersRequest,
  replyToTweetRequest,
};
