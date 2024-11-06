import { Header } from "./components/Header.js";
import { Post } from "./components/Post.js";
import styles from "./App.module.css";

import "./global.css";
import { Sidebar } from "./components/Sidebar.js";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl:
        "https://img.freepik.com/vetores-gratis/hacker-operando-uma-ilustracao-do-icone-dos-desenhos-animados-laptop-conceito-de-icone-de-tecnologia-isolado-estilo-flat-cartoon_138676-2387.jpg",
      name: "Murillo",
      role: "FrontEnd Developer",
    },
    content: [{ type: "paragraph", content: "Lorem Ipsum" }],
    publishedAt: new Date("2024, 10, 30 10:13"),
  },
  {
    id: 2,
    author: {
      avatarUrl:
        "https://dkrn4sk0rn31v.cloudfront.net/uploads/2018/08/17172630/desenvolvedor-web-400x280.png",
      name: "Matheus",
      role: "FrontEnd Developer",
    },
    content: [{ type: "paragraph", content: "Lorem Ipsum" }],
    publishedAt: new Date("2024, 10, 30 10:13"),
  },
];

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
