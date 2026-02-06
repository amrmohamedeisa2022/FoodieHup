import React, { useState } from "react";

export default function SearchFilters({ onSearch, categories }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  function submit(e) {
    e.preventDefault();
    onSearch({ q, cat });
  }

  return (
    <form onSubmit={submit} className="flex flex-col md:flex-row gap-3 items-center mb-6">
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search meals..." className="form-input flex-1" />
      <select value={cat} onChange={(e)=>setCat(e.target.value)} className="form-input w-44">
        <option value="all">All</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <button type="submit" className="btn-primary">Search</button>
    </form>
  );
}
