import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="h-dvh flex flex-col">
      <nav>내비게이션</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
}
