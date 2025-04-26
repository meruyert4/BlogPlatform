import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = () => {
  const location = useLocation();

  return (
    <AntHeader>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={[
          { key: '/', label: <Link to="/">Blog</Link> },
          { key: '/fake-api', label: <Link to="/fake-api">Fake API</Link> },
        ]}
      />
    </AntHeader>
  );
};

export default Header;
