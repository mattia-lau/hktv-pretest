import { Layout, Menu, notification } from "antd";
import Axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import {
    HomePage,
    InventoryPage,
    ProductDetailsPage,
    ProductPage,
} from "./pages";
import HistoryPage from "./pages/history";
import { InventoryDetailsPage } from "./pages/inventory/[id]";
import { fetchInventoryAsync } from "./state/ducks/inventory";
const { Header, Content } = Layout;

const App: React.FC = () => {
    let { pathname } = useLocation();

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchInventoryAsync.request({}));
    }, [dispatch]);

    const defaultKey = () => {
        if (pathname.charAt(0) === "/" && pathname.length > 1) {
            pathname = pathname.slice(1, pathname.length);
        }
        return pathname.length === 1 ? "/" : pathname.split("/")[0];
    };

    const ref = React.createRef<HTMLInputElement>();

    const handleOnUploadCsvClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        if (files!.length <= 0) return;

        const formData = new FormData();
        formData.append("file", files![0]);

        Axios.post("/transfers/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            notification.success({
                message: "Upload Data Success",
            });
        });
    };

    return (
        <>
            <Layout>
                <Header className="site-header">
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
                        <Menu.Item key="histories">
                            <Link to="/histories">History</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="transfer"
                            onClick={handleOnUploadCsvClick}
                        >
                            Transfer
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-content">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/products" component={ProductPage} />
                        <Route
                            exact
                            path="/histories"
                            component={HistoryPage}
                        />
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

            <input
                type="file"
                style={{ display: "none" }}
                ref={ref}
                onChange={onFileChange}
                multiple={false}
                accept=".csv"
            />
        </>
    );
};

export default App;
