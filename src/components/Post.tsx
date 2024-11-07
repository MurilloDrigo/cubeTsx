import styles from "./Post.module.css";
import { ThumbsUp } from "phosphor-react";

import {ptBR} from "date-fns/locale/pt-BR";
import { format, formatDistanceToNow } from "date-fns";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostData {
  id: number;
  author: Author;
  publishedAt: string;
  content: Content[];
  comments: string[];
  likeCount: number;
}

export function Post() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  function handleCreateNewComment(event: FormEvent, postId: number) {
    event.preventDefault();

    // Adicionar novo comentário no servidor
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comments: [...posts.find(post => post.id === postId)!.comments, newCommentText]
      })
    }).then(() => {
      // Atualizar estado local
      setPosts(posts.map(post => 
        post.id === postId 
        ? { ...post, comments: [...post.comments, newCommentText] }
        : post
      ));
      setNewCommentText("");
    });
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
  }

  function deleteComment(postId: number, commentToDelete: string) {
    const post = posts.find(post => post.id === postId)!;
    const updatedComments = post.comments.filter(comment => comment !== commentToDelete);

    // Atualizar comentários no servidor
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comments: updatedComments })
    }).then(() => {
      // Atualizar estado local
      setPosts(posts.map(post =>
        post.id === postId
        ? { ...post, comments: updatedComments }
        : post
      ));
    });
  }

  function handleLikePost(postId: number) {
    const post = posts.find(post => post.id === postId)!;
    const updatedLikeCount = post.likeCount + 1;

    // Atualizar contador de likes no servidor
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likeCount: updatedLikeCount })
    }).then(() => {
      // Atualizar estado local
      setPosts(posts.map(post =>
        post.id === postId
        ? { ...post, likeCount: updatedLikeCount }
        : post
      ));
    });
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <>
      {posts.map(post => {
        const publishedDate = new Date(post.publishedAt);
        const publishedDateFormatted = format(
          publishedDate,
          "d 'de' LLL 'às' HH:mm'h'",
          { locale: ptBR }
        );
        const publishedDateRelativeToNow = formatDistanceToNow(publishedDate, {
          locale: ptBR,
          addSuffix: true,
        });

        return (
          <article key={post.id} className={styles.post}>
            <header>
              <div className={styles.author}>
                <Avatar src={post.author.avatarUrl} />
                <div className={styles.authorInfo}>
                  <strong>{post.author.name}</strong>
                  <span>{post.author.role}</span>
                </div>
              </div>
              <time title={publishedDateFormatted} dateTime={post.publishedAt}>
                {publishedDateRelativeToNow}
              </time>
            </header>
            <div className={styles.content}>
              {post.content.map((line, index) => {
                if (line.type === "paragraph") {
                  return <p key={index}>{line.content}</p>;
                } else if (line.type === "link") {
                  return (
                    <p key={index}>
                      <a href={line.content} target="_blank" rel="noopener noreferrer">
                        {line.content}
                      </a>
                    </p>
                  );
                }
                return null;
              })}
            </div>               
            <button onClick={() => handleLikePost(post.id)} className={styles.likeButton}>
              <ThumbsUp />
              Aplaudir <span>{post.likeCount}</span>
            </button>
            <form onSubmit={(event) => handleCreateNewComment(event, post.id)} className={styles.commentForm}>
              <strong>Deixe seu feedback</strong>
              <textarea
                name="comment"
                placeholder="Deixe seu comentário"
                value={newCommentText}
                onChange={handleNewCommentChange}
                required
              />
              <footer>
                <button type="submit" disabled={isNewCommentEmpty}>
                  Publicar
                </button>
              </footer>
            </form>
            <div className={styles.commentList}>
              {post.comments.map((comment, index) => (
                <Comment
                  key={index}
                  content={comment}
                  onDeleteComment={() => deleteComment(post.id, comment)}
                />
              ))}
            </div>
          </article>
        );
      })}
    </>
  );
}
