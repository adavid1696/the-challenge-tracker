"use client"

import { useState } from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter()
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

		const formData = new FormData(e.currentTarget);

		// check to see if the input matches the stored data
		const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
			redirect: false
    });

		console.log("this is res: ", result)

		if(result?.error) {
			setError("Invalid email or password");
			setLoading(false);
			return
		}

		router.push("/")
  }

	return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
			<p>Dont have an account? <a href="/auth/register">Register</a></p>
    </div>
  );
}
