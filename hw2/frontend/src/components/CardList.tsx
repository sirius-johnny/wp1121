// import { useRef, useState } from "react";
// import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Button from "@mui/material/Button";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";

// import useCards from "@/hooks/useCards";
// import { deleteList, updateList } from "@/utils/client";
// import Card from "./Card";
import type { CardProps } from "./Card";
// import CardDialog from "./CardDialog";
// import CardList_showCard from "./CardList_showCard";
// import ShowList from "./ShowList";
// import { main } from "./ShowList";

export type CardListProps = {
  id: string;
  name: string;
  description: string;
  cards: CardProps[];
};

export default function CardList({ id, name, description, cards }: CardListProps) {
  // const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  // const [editingName, setEditingName] = useState(false);
  // const [editingDescription, setEditingDescription] = useState(false);
  // const { fetchLists } = useCards();
  // const inputRef = useRef<HTMLInputElement>(null);
  // const inputRef_Des = useRef<HTMLInputElement>(null);

  // const handleUpdateName = async () => {
  //   if (!inputRef.current) return;

  //   const newName = inputRef.current.value;
  //   if (newName !== name) {
  //     try {
  //       await updateList(id, { name: newName });
  //       fetchLists();
  //     } catch (error) {
  //       alert("Error: Failed to update list name");
  //     }
  //   }
  //   setEditingName(false);
  // };

  // const handleUpdateDescription = async () => {
  //   if (!inputRef_Des.current) return;

  //   const newDescription = inputRef_Des.current.value;
  //   if (newDescription !== description) {
  //     try {
  //       await updateList(id, { description: newDescription });
  //       fetchLists();
  //     } catch (error) {
  //       alert("Error: Failed to update list name");
  //     }
  //   }
  //   setEditingDescription(false);
  // };

  // const handleDelete = async () => {
  //   try {
  //     await deleteList(id);
  //     fetchLists();
  //   } catch (error) {
  //     alert("Error: Failed to delete list");
  //   }
  // };

  return (
    <>
      <Paper className="w-80 p-6">
        <div className="flex gap-4">
          <Link to={"/showlist?id="+id}>
            <img src="./src/components/playlist.png"/>
            <div>{cards.length} songs</div>
            <div>{name}</div>
            <div>{description}</div>
          </Link>
        </div>
      </Paper>
    </>
    );



  // return (
  //   <>
  //     <Paper className="w-80 p-6">
  //       <div className="flex gap-4">
  //         {/* Name */}
  //         {editingName ? (
  //           <ClickAwayListener onClickAway={handleUpdateName}>
  //             <Input
  //               autoFocus
  //               defaultValue={name}
  //               className="grow"
  //               placeholder="Enter a new name for this list..."
  //               sx={{ fontSize: "2rem" }}
  //               inputRef={inputRef}
  //             />
  //           </ClickAwayListener>
  //         ) : (
  //           <button
  //             onClick={() => setEditingName(true)}
  //             className="w-full rounded-md p-2 hover:bg-white/10"
  //           >
  //             <Typography className="text-start" variant="h4">
  //               {name}
  //             </Typography>
  //           </button>
  //         )}
  //         {/* Description */}
  //         {editingDescription ? (
  //           <ClickAwayListener onClickAway={handleUpdateDescription}>
  //             <Input
  //               autoFocus
  //               defaultValue={description}
  //               className="grow"
  //               placeholder="Enter a new description for this list..."
  //               sx={{ fontSize: "2rem" }}
  //               inputRef={inputRef_Des}
  //             />
  //           </ClickAwayListener>
  //         ) : (
  //           <button
  //             onClick={() => setEditingDescription(true)}
  //             className="w-full rounded-md p-2 hover:bg-white/10"
  //           >
  //             <Typography className="text-start" variant="h4">
  //               {description}
  //             </Typography>
  //           </button>
  //         )}

  //         <div className="grid place-items-center">
  //           <IconButton color="error" onClick={handleDelete}>
  //             <DeleteIcon />
  //           </IconButton>
  //         </div>
  //       </div>
       
  //       {/* <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
  //       <div className="flex flex-col gap-4">
  //         {cards.map((card) => (
  //           <Card key={card.id} {...card} />
  //         ))}
  //         <Button
  //           variant="contained"
  //           onClick={() => setOpenNewCardDialog(true)}
  //         >
  //           <AddIcon className="mr-2" />
  //           Add a song
  //         </Button>
  //       </div> */}
  //     </Paper>
  //     {/* <CardDialog
  //       variant="new"
  //       open={openNewCardDialog}
  //       onClose={() => setOpenNewCardDialog(false)}
  //       listId={id}
  //     /> */}
  //   </>
  // );
}
