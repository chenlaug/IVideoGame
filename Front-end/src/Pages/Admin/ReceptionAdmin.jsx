import  { useState } from "react";
import AdminGame from "./AdminGame";
import SideBar from "../../Components/NavBar/SideBar";

export default function ReceptionAdmin() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="min-h-screen">
      <SideBar hovered={hovered} setHovered={setHovered} />
      <AdminGame hovered={hovered} />
    </div>
  );
}
