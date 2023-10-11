import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Add as AddIcon, RouteSharp } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import Home from "@/components/Home";
import ShowList from "@/components/ShowList";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";

function App() {

  return (
    <>
      <HeaderBar />
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showlist" element={<ShowList />} />
      </Routes>
    </>
  );
}

export default App;
