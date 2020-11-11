import { Layout, Menu } from "antd";
import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import {
    HomePage,
    InventoryPage,
    ProductDetailsPage,
    ProductPage,
} from "./pages";
import { InventoryDetailsPage } from "./pages/inventory/[id]";
const { Header, Content } = Layout;

const App: React.FC = () => {
    let { pathname } = useLocation();

    const defaultKey = () => {
        if (pathname.charAt(0) === "/" && pathname.length > 1) {
            pathname = pathname.slice(1, pathname.length);
        }
        return pathname.length === 1 ? "/" : pathname.split("/")[0];
    };

    return (
        <Layout>
            <Header className="site-header" style={{}}>
                <div className="logo">Inventory Management System</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[defaultKey()]}
                >
                    <Menu.Item key="/">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="products">
                        <Link to="/products">Products</Link>
                    </Menu.Item>
                    <Menu.Item key="inventories">
                        <Link to="/inventories">Inventories</Link>
                    </Menu.Item>
                    <Menu.Item key="transfer">
                        <Link to="/transfer">Transfer</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content className="site-content">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/products" component={ProductPage} />
                    <Route
                        exact
                        path="/inventories"
                        component={InventoryPage}
                    />
                    <Route
                        path="/inventories/:code"
                        children={<InventoryDetailsPage />}
                    />
                    <Route
                        path="/products/:code"
                        children={<ProductDetailsPage />}
                    />
                </Switch>
            </Content>
        </Layout>
    );
};

export default App;
