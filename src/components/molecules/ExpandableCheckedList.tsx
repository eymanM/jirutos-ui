import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { AccordionSummary, Typography, Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { v4 as uuidv4 } from "uuid";

type ExpandableCheckedListProps = {
  title: string;
  items: string[];
  itemsNames: string[];
  checkedItems: string[];
  setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

const ExpandableCheckedList: React.FC<ExpandableCheckedListProps> = ({
  title,
  items,
  itemsNames,
  checkedItems,
  setCheckedItems,
}) => {
  const handleToggle = (value: string) => () => {
    const currentIndex = checkedItems.indexOf(value);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setCheckedItems(newChecked);
  };

  return (
    <Accordion style={{ zIndex: 1001 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <List>
        {items.map((value, index) => (
          <ListItem key={value} disablePadding>
            <ListItemButton onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox edge="start" checked={checkedItems.indexOf(value) !== -1} tabIndex={-1} />
              </ListItemIcon>
              <ListItemText id={uuidv4()} primary={`${itemsNames[index]}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Accordion>
  );
};

export default ExpandableCheckedList;
