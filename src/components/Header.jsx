// src/components/Header.jsx
import React from "react";
import { LayoutDashboard } from "lucide-react";

const Header = ({ t }) => (
  <header className="w-full bg-transparent text-blue-600">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LayoutDashboard size={24} />
        <span className="font-bold text-xl sm:text-lg">{t.dashboard}</span>
      </div>
      {/* Vous pouvez ajouter d'autres éléments au header ici si nécessaire */}
    </div>
  </header>
);

export default Header;
