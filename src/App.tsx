import React from "react";
import { Routes, Route } from "react-router-dom";
import PostsList from "./pages/PostsList";
import EditPost from "./pages/EditPost";
import BlankPage from "./pages/Blank";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BlankPage />} />
      <Route path="/list" element={<PostsList />} />
      <Route path="/edit/:id" element={<EditPost />} />
    </Routes>
  );
};

export default App;
