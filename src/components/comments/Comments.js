import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";

const Comments = () => {
  const [addCommentContent, setAddCommentContent] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { quoteId } = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const textAreaChangeHandler = (event) => {
    setAddCommentContent(event.target.value);
  };
  // useEffect for fetching data whenever this component is loaded/changed (as
  // opposed to waiting for a comment to be submitted)
  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
    setAddCommentContent("");
  }, [sendRequest, quoteId]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments added yet.</p>;
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
          textAreaChangeHandler={textAreaChangeHandler}
          addCommentContent={addCommentContent}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
