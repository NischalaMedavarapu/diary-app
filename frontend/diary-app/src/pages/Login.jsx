import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin.js";
import "./Auth.css"; // Import the updated CSS file

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { login, loading, error } = useLogin();

    const onSubmit = async (data) => {
        await login(data.email, data.password);
        reset();
    };

    return (
        <div className="auth-page"> {/* ✅ Styled background */}
            <div className="auth-container"> {/* ✅ Styled form container */}
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <h3>Login</h3>
                    <input type="email" {...register("email", { required: "Required" })} placeholder="Email" />
                    <p>{errors.email?.message}</p>
                    <input type="password" {...register("password", { required: "Required" })} placeholder="Password" />
                    <p>{errors.password?.message}</p>
                    <button type="submit" disabled={loading}>Login</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
