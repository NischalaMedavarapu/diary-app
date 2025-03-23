import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";
import "./DiaryPost.css"; // ✅ Import the new CSS file

const DiaryPost = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!user) return;

            const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            if (response.ok) {
                const json = await response.json();
                setPost(json);
            }
        };

        fetchPost();
    }, [user, id]);

    if (!post) return <p className="loading-message">Loading...</p>;

    return (
        <div className="diary-post-container">
            {/* ✅ Post Title */}
            <h1 className="post-title">{post.title}</h1>

            {/* ✅ Post Date */}
            <p className="post-date">{format(new Date(post.date), "dd-MM-yyyy")}</p>

            {/* ✅ Post Content */}
            <div className="post-content">
                <p>{post.content}</p>
            </div>
        </div>
    );
};

export default DiaryPost;
