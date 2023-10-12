import { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";

// import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";
// import Products from "@/components/ShowList";

export default function Home() {
    const { lists, fetchLists, fetchCards } = useCards();
    const [newListDialogOpen, setNewListDialogOpen] = useState(false);

    useEffect(() => {
    fetchLists();
    fetchCards();
    }, [fetchCards, fetchLists]);

    return (
      <>
        <div>
            <Button
              variant="contained"
              className="w-60"
              onClick={() => setNewListDialogOpen(true)}
            >
              {/* <AddIcon className="mr-2" /> */}
              ADD(playlist)
            </Button>

            <Button
              variant="contained"
              className="w-60"
              onClick={() => setNewListDialogOpen(false)}
            >
              {/* <AddIcon className="mr-2" /> */}
              DELETE(playlist)
            </Button>
        </div>
        <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
          {lists.map((list) => (
            <CardList key={list.id} {...list} />
          ))}
          
          <NewListDialog
            open={newListDialogOpen}
            onClose={() => setNewListDialogOpen(false)}
          />
        </main>

      </>
    );
  }