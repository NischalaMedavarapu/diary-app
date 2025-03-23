import { Link } from "react-router-dom";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const PostHead = ({ post }) => {
    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();
    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleDateString("en-GB"); // DD-MM-YYYY
        const formattedTime = date.toLocaleTimeString("en-GB"); // HH:MM:SS
        return `${formattedDate} ${formattedTime}`; // Combined format
    };

    const handleClick = async () => {
        if (!user) return;

        const response = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${user.token}` },
        });

        if (response.ok) {
            const deletedPost = await response.json();
            dispatch({ type: "DELETE_POST", payload: deletedPost });
        }
    };

    return (
        <li className="postItem">
            {/* ✅ Link is still functional but looks like regular text */}
            <Link to={`/posts/${post._id}`} className="post-title">{post.title}</Link>
            <p className="post-date">{formatDateTime(post.date)}</p>
            <button onClick={handleClick}>Delete</button>
        </li>
    );
};

export default PostHead;
