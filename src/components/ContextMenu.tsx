import React from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  options: string[];
  onSelect: (status: string) => void;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, options, onSelect, onClose }) => {
  return (
    <div
      className="context-menu"
      style={{
        position: "absolute",
        top: y,
        left: x,
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        zIndex: 9999,
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {options.map((opt) => (
        <div
          key={opt}
          className="context-menu-item"
          style={{ padding: "6px 12px", cursor: "pointer" }}
          onClick={() => {
            onSelect(opt);
            onClose();
          }}
        >
          Move to {opt}
        </div>
      ))}
    </div>
  );
};