import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup.js";
import "./Auth.css"; // Import the updated CSS file

const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { signup, loading, error } = useSignup();

    const onSubmit = async (data) => {
        await signup(data.email, data.password);
        reset();
    };

    return (
        <div className="auth-page"> {/* ✅ Styled background */}
            <div className="auth-container"> {/* ✅ Styled form container */}
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <h3>Signup</h3>
                    <input type="email" {...register("email", { required: "Required" })} placeholder="Email" />
                    <p>{errors.email?.message}</p>
                    <input type="password" {...register("password", { required: "Required" })} placeholder="Password" />
                    <p>{errors.password?.message}</p>
                    <button type="submit" disabled={loading}>Signup</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
