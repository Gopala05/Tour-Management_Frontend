import { BsGrid1X2Fill, BsBookFill, BsActivity} from "react-icons/bs";
import travel from "../../assets/Icons/trael-dash.png"
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

function Sidebar({ openSidebarToggle, OpenSidebar }: SidebarProps) {
  const navigate = useNavigate();
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title" style={{ paddingLeft: '0.85vw' }}>
        <div className="sidebar-brand" >
          <img src={travel} alt="Travel Icon" width={50} className="icon_header" /> TRAVEL
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item" onClick={() => navigate('/home')}>
            <BsGrid1X2Fill className="icon" /> Dashboard
        </li>
        <li className="sidebar-list-item" onClick={() => navigate('/booking')}>
            <BsBookFill className="icon" /> Bookings
        </li>
        <li className="sidebar-list-item" onClick={() => navigate('/feedback')}>
            <BsActivity className="icon" /> Feedback
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
