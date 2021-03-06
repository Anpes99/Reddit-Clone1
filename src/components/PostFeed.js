import PostFeedItem from "./PostFeedItem";
import TopCommunities from "./TopCommunities";
import { FireIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/outline";
import { TrendingUpIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import useGetPosts from "../hooks/useGetPosts";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import socket from "../websockets/posts";

const PostFeed = ({ subredditId, orderType }) => {
  const [reachedEnd, setReachedEnd] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  orderType = orderType ? orderType : "new";
  const [fetchMorePosts, loading, posts] = useGetPosts(
    sort,
    subredditId,
    orderType
  );

  const observer = useRef();
  const lastPostRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMorePosts(orderType);
      }
    });
    if (node) observer.current.observe(node);
  });

  /* const sortByDate = async () => {
    const result = await axios.get(`/api/posts?sortBy=createdAt&order=ASC`);
    setPost(result.data);
  };
^*/

  return (
    <div
      onScroll={() => {
        console.log("scroll");
      }}
      className="flex flex-col  w-full"
    >
      <p className="py-4 font-medium text-gray-700 px-1">Popular posts</p>
      <div className="flex justify-center lg:justify-between w-full">
        <div className="pr-0 lg:pr-7 w-full">
          <div className="flex space-x-4 bg-white p-5 text-xs sm:text-sm mb-2 border border-gray-300 w-full">
            {/*  <button
              onClick={() => {
                if (orderType !== "hot") window.location.href = "/hot";
              }}
              className={`flex items-center font-semibold ${
                orderType === "hot" ? "text-blue-500" : "text-gray-400"
              } sm:space-x-1 hover:bg-gray-100 px-2 py-1 rounded-3xl`}
            >
              <FireIcon className="h-5 sm:h-7" />
              <p className="hidden sm:inline">Hot</p>
            </button>*/}
            <button
              onClick={() => {
                if (orderType !== "new") window.location.href = "/";
              }}
              className={`flex items-center font-semibold ${
                orderType === "new" ? "text-blue-500" : "text-gray-400"
              } space-x-1 hover:bg-gray-100 px-2 py-1 rounded-3xl`}
            >
              <SunIcon className="h-7" />
              <p className="inline">New</p>
            </button>
            <button
              onClick={() => {
                if (orderType !== "top") window.location.href = "/top";
              }}
              className={`flex items-center font-semibold ${
                orderType === "top" ? "text-blue-500" : "text-gray-400"
              } space-x-1 hover:bg-gray-100 px-2 py-1 rounded-3xl`}
            >
              <TrendingUpIcon className="h-7" />
              <p className="inline">Top</p>
            </button>
          </div>
          {posts.map((post, i) => {
            console.log(post.id, "  ", i);
            if (i + 1 === posts.length) {
              return (
                <div key={post.id} ref={lastPostRef}>
                  <PostFeedItem post={post} />
                </div>
              );
            } else return <PostFeedItem post={post} key={post.id} />;
          })}
        </div>
        <div className="hidden lg:block">
          <TopCommunities />
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
