import React from 'react'
import { Link } from 'react-router-dom'

export default function Comment({comment}) {
   
    const date = new Date(comment?.createdAt);
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    
  return (
    comment &&
        <div className="mt-3 flex items-start gap-2">

            <img
                  src={comment.commentCreator.photo}
                  alt={comment.commentCreator.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                />
        <div className="bg-gray-100 rounded-2xl w-full ">


             <div className="flex items-center gap-3 pt-2 border-gray-100">
              <Link to={`/profile/${comment.commentCreator.name}`} className="flex items-center gap-3">
                
              </Link>

              <div className="flex-1">
                <Link
                  to={`/profile/${comment.commentCreator.name}`}
                  className="hover:text-primary transition-colors"
                >
                  <p className="font-bold text-gray-900 inline">
                    {comment.commentCreator.name}
                  </p>
                </Link>

                <p className="text-sm text-gray-500">
                  {formattedDate}
                </p>
              </div>
             </div>

              <div className="px-5 py-2">
                <p className="text-gray-800">{comment?.content}</p>
              </div>
        </div>

        </div>
          
  )
}
