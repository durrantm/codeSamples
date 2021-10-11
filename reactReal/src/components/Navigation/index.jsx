import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink exact to="/" title="Home Page.  Markets and Wallets" className="nav-link">Home</NavLink>
      <NavLink to="/executions" title="Recent trade executions" className="nav-link">Executions</NavLink>
      <NavLink to="/orders" title="Current limit orders" className="nav-link">Orders</NavLink>
      <NavLink to="/trading" title="Multi trade entry" className="nav-link">Trading</NavLink>
    </nav>
  );
}

export default Navigation;
