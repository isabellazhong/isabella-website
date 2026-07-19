import { Link, useParams } from "react-router-dom";
import { BLOGS } from "../data/blogs";

export default function BlogPost() {
  const { id } = useParams();
  const blog = BLOGS.find((b) => b.id === id);

  if (!blog) {
    return (
      <main className="page">
        <h1 className="display page-title">hmm.</h1>
        <p>that post does not exist (yet).</p>
        <p>
          <Link to="/blogs" className="text-link">
            back to blogs
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="page blog-post">
      <p>
        <Link to="/blogs" className="text-link">
          back to blogs
        </Link>
      </p>
      <h1 className="display">{blog.title}</h1>
      <p className="blog-date">{blog.date}</p>
      {blog.body.map((para, i) => (
        <p key={i} className="blog-body">
          {para}
        </p>
      ))}
    </main>
  );
}
