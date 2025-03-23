import { useEffect, useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import PostHead from "../components/PostHead";
import PostForm from "../components/PostForm";
import "./Home.css";

const Home = () => {
    const { posts, dispatch } = usePostsContext();
    const { user } = useAuthContext();

    // ✅ Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4; // ✅ Set number of posts per page

    useEffect(() => {
        const fetchPosts = async () => {
            if (!user) return;

            const response = await fetch("http://localhost:5000/api/posts", {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            if (response.ok) {
                const json = await response.json();
                dispatch({ type: "SET_POSTS", payload: json });
            }
        };

        fetchPosts();
    }, [user, dispatch]);

    // ✅ Get Current Page Posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

    // ✅ Change Page
    const totalPages = Math.ceil((posts?.length || 0) / postsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // ✅ If user is NOT logged in, show intro content
    if (!user) {
        return (
            <div className="home-intro">
                <h1>Your thoughts are kept safe 🤫</h1>
                <p className="tagline">Capture your thoughts, weave your story.</p>
                <p className="cta">Sign up today and start your journaling experience!</p>
            </div>
        );
    }

    // ✅ If user is logged in, show the post feed and post form
    return (
        <div className="home-container">
            {/* Left Side: Posts */}
            <div className="posts-section">
                <h1>Your Posts</h1>
                <ul className="posts-list">
                    {currentPosts && currentPosts.length > 0 ? (
                        currentPosts.map((post) => (
                            <li key={post._id} className="post-item">
                                <PostHead post={post} />
                            </li>
                        ))
                    ) : (
                        <p className="no-posts-message">No posts yet. Start writing your first diary entry!</p>
                    )}
                </ul>

                {/* ✅ Pagination */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="page-btn"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            ⬅ Back in Time
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="page-btn"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Into the Future ➡
                        </button>
                    </div>
                )}
            </div>

            {/* ✅ Right Side: Post Form */}
            <div className="post-form-container">
                <PostForm />
            </div>
        </div>
    );
};

export default Home;
