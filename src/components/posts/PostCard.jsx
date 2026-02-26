import { useContext, useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Image, Spinner } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import Comment from "./Comment";
import axios from "axios";
import { authContext } from "../../context/AuthContext";
import MyData, { MyDataContext } from "../../context/MyData";


export function PostCard({ post, comments }) {

  let { user } = useContext(MyDataContext)

  const [newComment, setNewComment] = useState("");
  const [loadingNewComment, setLoadingNewComment] = useState(false);
  const [postData, setpostData] = useState(post);
  const date = new Date(postData.createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let { token } = useContext(authContext)
  async function sendComment() {
    try {
      setLoadingNewComment(true);
      setNewComment("");
      const response = await axios.post(
        `https://route-posts.routemisr.com/posts/${postData._id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setpostData(post)
      setLoadingNewComment(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  }
  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/50">

      {/* User header */}
      <div className="flex items-center gap-3 p-4">
        <Link to={`/profile/${postData.user.name}`} className="flex items-center gap-3">
          <img
            src={postData.user.photo}
            alt={postData.user.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
          />
        </Link>

        <div className="flex-1">
          <Link
            to={`/profile/${postData.user.name}`}
            className="hover:text-primary transition-colors"
          >
            <p className="text-gray-900 inline font-bold">
              {postData.user.name}
            </p>
          </Link>

          <p className="text-sm text-gray-500">
            @{postData.user.username} · {formattedDate}
          </p>
        </div>
      </div>

      {/* Post body */}
      {postData.body &&
        <div className="px-4 pb-2">
          <p className="text-gray-800">{postData.body}</p>
        </div>}

      {/* Post image */}
      {postData.image &&
        <div className="relative w-full bg-gray-100">
          <Image
            isBlurred
            removeWrapper
            alt={postData.body}
            className="w-full h-full object-cover"
            src={postData.image}
          />

        </div>
      }

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-8 relative borderbottom border-gray-100 pb-4">
          <button

            className="flex items-center gap-2 transition-all duration-200 hover:scale-110"
          >
            <div className="">
              <Heart
                className={`w-6 h-6 transition-colors ${postData.likesCount
                  ? "fill-red-500 text-red-500"
                  : "text-gray-700 hover:text-red-500"
                  }`}
              />
              <p className="font-medium text-gray-500 text-sm">
                {postData.likesCount}
              </p>
            </div>
          </button>

          <Link to={`/post/${postData._id}`} className="flex items-center gap-2 transition-all duration-200 hover:scale-110">
            <div className="">
              <MessageCircle className="w-6 h-6 text-gray-700 hover:text-primary" />
              <p className="text-sm text-gray-500 p-1.5">{postData.commentsCount}</p>
            </div>
          </Link>

          <Link className="flex items-center gap-2 transition-all duration-200 hover:scale-110">
            <div className="">
              <Share2 className="w-6 h-6 text-gray-700 hover:text-primary" />
              <p className="text-sm text-gray-500">Share</p>
            </div>
          </Link>

          <button className="flex items-center gap-2 ml-auto transition-all duration-200 hover:scale-110">
            <Bookmark className="w-6 h-6 text-gray-700 hover:text-emerald-500" />
          </button>

        </div>

        {/* create comment */}
        <div className=" p-4 flex items-center gap-2 mb-6">
          <img
            src={user.photo}
            className="w-10 h-10 rounded-full"
          />
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            placeholder="Add comment"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          {
            loadingNewComment ?
              <button className={` text-white w-10 h-10 rounded-full text-xl flex justify-center items-center bg-blue-300`}>
                <Spinner />
              </button>
              :
              <button onClick={() => newComment && sendComment()} className={` text-white w-10 h-10 rounded-full text-xl flex justify-center items-center ${newComment ? "bg-blue-500 cursor-pointer" : "bg-blue-300"}`}>
                <FaArrowRightLong />
              </button>
          }
        </div>


        {/* comments */}
        {comments ? comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        )) : ""}
        {
          comments.length > 0 ?
            <Link to={`/post/${postData._id}`} className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer">
              View all comments
            </Link> : ""
        }


      </div>
    </div>

  );
}