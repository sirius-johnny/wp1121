// import { useRef, useState } from "react";

// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";

// import useCards from "@/hooks/useCards";
import { getList } from "@/utils/client";

// import Card from "./Card";
import type { CardProps } from "./Card";
// import CardDialog from "./CardDialog";
// import { get } from "http";
// import type { CardData } from "@lib/shared_types"; 
// import { List } from "@mui/material";

export type CardListProps = {
  id: string;
  name: string;
  description: string;
  cards: CardProps[];
};

let name:string;
let description:string;
// let cards:CardData[];

export const main = async (list_id:string) => {
  // const searchURL = window.location.search;
  // const list_id = searchURL.split("&")[0].split("=")[1];
  const iin = await getList(list_id);
  const inst = iin.data;
  name = inst.name;
  description = inst.description;
  // cards = inst.cards;
  return ;
}

export default function ShowList() {
  const searchURL = window.location.search;
  const list_id = searchURL.split("&")[0].split("=")[1];
  main(list_id);

    return(
      <>
        <h1>This is show list page.</h1>
        <Button>
          ShowList
        </Button>
        <h1>name={name}</h1>
        <h1>description={description}</h1>
      </>
    );
}






// function ShowList_2({ id, name, description, cards }: CardListProps) {
//   const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
//   const [editingName, setEditingName] = useState(false);
//   const [editingDescription, setEditingDescription] = useState(false);
//   const { fetchLists } = useCards();
//   const inputRef = useRef<HTMLInputElement>(null);
//   const inputRef_Des = useRef<HTMLInputElement>(null);

//   const handleUpdateName = async () => {
//     if (!inputRef.current) return;

//     const newName = inputRef.current.value;
//     if (newName !== name) {
//       try {
//         await updateList(id, { name: newName });
//         fetchLists();
//       } catch (error) {
//         alert("Error: Failed to update list name");
//       }
//     }
//     setEditingName(false);
//   };

//   const handleUpdateDescription = async () => {
//     if (!inputRef_Des.current) return;

//     const newDescription = inputRef_Des.current.value;
//     if (newDescription !== description) {
//       try {
//         await updateList(id, { description: newDescription });
//         fetchLists();
//       } catch (error) {
//         alert("Error: Failed to update list name");
//       }
//     }
//     setEditingDescription(false);
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteList(id);
//       fetchLists();
//     } catch (error) {
//       alert("Error: Failed to delete list");
//     }
//   };

//   return (
//     <>
//       <Paper className="w-80 p-6">
//         <div className="flex gap-4">
//           {/* Name */}
//           {editingName ? (
//             <ClickAwayListener onClickAway={handleUpdateName}>
//               <Input
//                 autoFocus
//                 defaultValue={name}
//                 className="grow"
//                 placeholder="Enter a new name for this list..."
//                 sx={{ fontSize: "2rem" }}
//                 inputRef={inputRef}
//               />
//             </ClickAwayListener>
//           ) : (
//             <button
//               onClick={() => setEditingName(true)}
//               className="w-full rounded-md p-2 hover:bg-white/10"
//             >
//               <Typography className="text-start" variant="h4">
//                 {name}
//               </Typography>
//             </button>
//           )}
//           {/* Description */}
//           {editingDescription ? (
//             <ClickAwayListener onClickAway={handleUpdateDescription}>
//               <Input
//                 autoFocus
//                 defaultValue={description}
//                 className="grow"
//                 placeholder="Enter a new description for this list..."
//                 sx={{ fontSize: "2rem" }}
//                 inputRef={inputRef_Des}
//               />
//             </ClickAwayListener>
//           ) : (
//             <button
//               onClick={() => setEditingDescription(true)}
//               className="w-full rounded-md p-2 hover:bg-white/10"
//             >
//               <Typography className="text-start" variant="h4">
//                 {description}
//               </Typography>
//             </button>
//           )}

//           <div className="grid place-items-center">
//             <IconButton color="error" onClick={handleDelete}>
//               <DeleteIcon />
//             </IconButton>
//           </div>
//         </div>
       
//         <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
//         <div className="flex flex-col gap-4">
//           {cards.map((card) => (
//             <Card key={card.id} {...card} />
//           ))}
//           <Button
//             variant="contained"
//             onClick={() => setOpenNewCardDialog(true)}
//           >
//             <AddIcon className="mr-2" />
//             Add a song
//           </Button>
//         </div>
//       </Paper>
//       <CardDialog
//         variant="new"
//         open={openNewCardDialog}
//         onClose={() => setOpenNewCardDialog(false)}
//         listId={id}
//       />
//     </>
//   );
// }
