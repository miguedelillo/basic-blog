"use client"
import { useEffect } from "react";
import { useState } from "react";
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi,
} from "../../app/api/commentsApi";
import Comment from "@/components/comments/Comment";
import CommentForm from "@/components/comments/CommentForm";

const Comments = ({ currentUserId }) => {
    const [backendComments, setBackendComments] = useState([]) //Uso la funcion magica de la Api. 
    const rootComments = backendComments.filter(backendComment => backendComment.parentId === null);
    console.log("backendComments: ", backendComments);
    const getReplies = commentId => {
        return backendComments.filter(backendComments => backendComments.parentId === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    const addComment = (text, parentId) => {
        console.log("addComennt", text, parentId)
        createCommentApi(text, parentId).then(comment => {
            setBackendComments([comment, ...backendComments])
            setActiveComment(null)
        })
    }
    const deleteComment = (commentId) => {
        if (window.confirm("Desea borrar el comentario?")) {
            deleteCommentApi(commentId).then(() => {
                const updateBackendComments = backendComments.filter((backendComment) => backendComment.id !== commentId);
                setBackendComments(updateBackendComments);
            })
        }
    }
    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updatedBackendComments = backendComments.map(backendComment => {
                if (backendComment.id === commentId){
                    return {...backendComment, body: text}
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        })
    }
    const [activeComment, setActiveComment] = useState(null) // {type:"editing",commentId:"1"}, {type:"replying",id:"1"} 
    useEffect(() => {
        getCommentsApi().then(data => {
            setBackendComments(data);
        })
    }, [])

    return (
        <div className="comments">
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
            <div className="comments-container">
                {rootComments.map(rootComment => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        
                    />
                ))}
            </div>
        </div>
    )
}

export default Comments;