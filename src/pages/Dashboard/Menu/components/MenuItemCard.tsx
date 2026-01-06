import { MenuItem } from "@/types";

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: () => void;
  dragHandleProps?: any;
  isDragging?: boolean;
}
