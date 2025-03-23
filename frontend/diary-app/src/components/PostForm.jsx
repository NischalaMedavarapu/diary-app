import { useForm } from "react-hook-form";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const PostForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();

    // ✅ Function to get the current date & time
    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toISOString();
    };

    const onSubmit = async (data) => {
        if (!user) return;

        const post = {
            date: getCurrentDateTime(),
            title: data.title,
            content: data.content
        };

        try {
            const response = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(post),
            });

            if (!response.ok) {
                console.error("Error creating post");
            } else {
                const newPost = await response.json();
                reset({ title: "", content: "" });
                dispatch({ type: "CREATE_POST", payload: newPost });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="postForm" onSubmit={handleSubmit(onSubmit)}>
            <h3>Create a Post</h3>
            <input type="text" {...register("title", { required: "Title is required" })} placeholder="Post Title" />
            <p className="error-message">{errors.title?.message}</p>
            <textarea rows="5" {...register("content", { required: "Content is required" })} placeholder="Write your thoughts here..."></textarea>
            <p className="error-message">{errors.content?.message}</p>
            <button type="submit">Post</button>
        </form>
    );
};

export default PostForm;
