import React from "react";

export function Star({ className }: { className?: string }) {
  return (
    <span className={className} title="Это событие полезно для пользовательских игр">
      ⭐
    </span>
  );
}
