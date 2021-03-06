import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import PostFeed from "../components/PostFeed";
import skyrim from "../fake data/skyrim.png";
import { setCurrentSubreddit } from "../slices/appSlice";
import { useDispatch } from "react-redux";

const SubredditPage = () => {
  console.log("gfiuadsfhbg");
  const dispatch = useDispatch();
  const subredditName = useParams().subredditName;

  const [subredditId, setSubredditId] = useState(null);
  useEffect(async () => {
    const res = await axios.get("/api/subreddits?name=" + subredditName);
    setSubredditId(res.data[0].id);
    console.log(res);
    dispatch(setCurrentSubreddit(res.data[0]));
  }, [subredditName]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <div>
        <div className="bg-blue-500 h-20"></div>
        <div className="bg-white h-[6rem]">
          <div className="max-w-screen-lg m-auto flex space-x-4">
            <div className="rounded-full h-20 w-20 overflow-hidden border-4 border-white -translate-y-5">
              <img src={skyrim} alt="" />
            </div>
            <div className="flex flex-col items-start space-y-1 py-2">
              <h2 className="font-bold text-lg">{subredditName}</h2>
              <p className="font-semibold text-xs text-gray-400">
                r/{subredditName}
              </p>
            </div>
            <button className="join-btn self-center">Join</button>
          </div>
        </div>
      </div>
      <main className="max-w-screen-lg m-auto">
        {subredditId && (
          <div>
            <PostFeed subredditId={subredditId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default SubredditPage;
