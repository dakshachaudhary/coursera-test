import { createContext, useEffect } from "react";
import { useProvideTweets } from "../hooks";

const initialState = {
  tweets: [],
  setRefreshValue: ()=>{},
  loading:true
};

export const TweetsContext = createContext(initialState);

export function TweetsProvider({ children }) {
  const tweets = useProvideTweets();
  // useEffect(() => {}, [tweets]);
  return (
    <TweetsContext.Provider value={tweets}>{children}</TweetsContext.Provider>
  );
}
