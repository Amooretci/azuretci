import { useState } from "react";

interface MenuItem {
  label: string;
  onClick: () => void | Promise<void>;
}

interface EllipsisMenuProps {
  menuItems: MenuItem[];
}

export default function EllipsisMenu({ menuItems }: EllipsisMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontSize: 24,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#f4a261", // orange
        }}
        aria-label="Open menu"
      >
        &#8230;
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            background: "#0077b6", // blue background
            borderRadius: 8,
            padding: "8px 0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            minWidth: 160,
            zIndex: 100,
          }}
          tabIndex={-1}
        >
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {menuItems.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                style={{
                  padding: "8px 16px",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  color: "white",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
