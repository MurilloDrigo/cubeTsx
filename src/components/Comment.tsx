
import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";
import { useState } from "react";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment(){
    setLikeCount(likeCount+1)
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="src\assets\murillo.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header className={styles.sad}>
            <div className={styles.authorAndTime}>
              <strong>Murillo Drigo</strong>
              <time
                title="29 de outubro às 10:11"
                dateTime="2024-29-10 10:11:20"
              >
                Cerca de 1h atrás
              </time>
            </div>
            <button 
            onClick={handleDeleteComment}
            title="Deletar Comentário">
              <Trash size={20} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
