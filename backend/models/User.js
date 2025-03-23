import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { collection: "users", timestamps: true });

// 🔹 Signup function
UserSchema.statics.signup = async function(email, password) {
    if (!validator.isEmail(email)) throw new Error("Invalid email format");

    const existingUser = await this.findOne({ email });
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.create({ email, password: hashedPassword });
};

// 🔹 Login function
UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Incorrect password");

    return user;
};

export default model("User", UserSchema);
