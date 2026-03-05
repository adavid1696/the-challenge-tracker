"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
		setLoading(false)
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const resJSON = await res.json();
		
    if (res.status === 409) {
			setLoading(true);
      setMessage(resJSON.message);
    } else router.push("/dashboard");
  }

  return (
    <div>
      {loading && <p>{message}</p>}
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="username"
          type="text"
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />
        <input
          name="email"
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
