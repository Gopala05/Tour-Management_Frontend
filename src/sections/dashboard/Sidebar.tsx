import { BsGrid1X2Fill, BsBookFill, BsActivity, BsAirplaneEnginesFill } from "react-icons/bs";

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

function Sidebar({ openSidebarToggle, OpenSidebar }: SidebarProps) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsAirplaneEnginesFill className="icon_header" style={{ rotate: '45deg'}} /> TRAVEL
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="" >
            <BsBookFill className="icon" /> Bookings
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsActivity className="icon" /> Activity
          </a>
        </li>
        {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
