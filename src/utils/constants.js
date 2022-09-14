const ROOT_URL = "http://localhost:8082/api/v1.0/tweetapi";
const API_URLS = {
  login: () => `${ROOT_URL}/login`,
  register : () => `${ROOT_URL}/register`,
  allTweets:()=>`${ROOT_URL}/all`,
  addTweet: (username)=>`${ROOT_URL}/${username}/add`,
  deleteTweet: (username,id)=>`${ROOT_URL}/${username}/delete/${id}`,
  updateTweet:(username,tweetId)=>`${ROOT_URL}/${username}/update/${tweetId}`,
  replyToTweet:(username,tweetId)=>`${ROOT_URL}/${username}/reply/${tweetId}`,
  toggleLike:(username,id) => `${ROOT_URL}/${username}/like/${id}`,
  allUsers:()=>`${ROOT_URL}/users/all`
};

export default API_URLS;
