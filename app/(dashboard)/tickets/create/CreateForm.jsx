"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newTicket = {
      title,
      body,
      priority,
      user_email: "mario@netninja.dev",
    };

    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-5">
      <label htmlFor="Title">
        <span className=" text-lg font-medium text-gray-700">Title:</span>
        <input
          required
          type="text"
          id="Title"
          className="mt-0.5 mb-2 p-2 w-full rounded border border-gray-300 shadow-sm sm:text-lg"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label htmlFor="Content">
        <span className="text-base font-medium text-gray-700">Content:</span>
        <textarea
          required
          className="mt-0.5 mb-2 p-2 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-lg"
          rows="4"
          id="Content"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label htmlFor="Priority">
        <span className="text-base font-medium text-gray-700">Priority:</span>
        <select
          id="Priority"
          className="mt-0.5 mb-2 p-2 w-full rounded border border-gray-300 shadow-sm sm:text-lg"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary mt-5" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}
