import { Menu, MenuItem } from '@blueprintjs/core';

const Sidebar = () => {

  return (
    <div className="sidebar">
      <Menu>
        <MenuItem text="Overview" />
        <MenuItem text="Scatterplot" />
        <MenuItem text="Heat Map" />
      </Menu>
    </div>
  );
};

export default Sidebar;
