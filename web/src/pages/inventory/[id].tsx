import { Descriptions, Empty, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import Axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { TransferInventoryModal } from "../../components";
import { Inventory, Stock } from "../../types";

const { Title } = Typography;

interface State {
    loading: boolean;
    data: Inventory | null;
    stocks: Stock[];
}

interface ModelState {
    visible: boolean;
    stock: Stock | null;
}

export const InventoryDetailsPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();

    const [state, setState] = React.useState<State>({
        loading: false,
        data: null,
        stocks: [],
    });

    const [model, setModel] = React.useState<ModelState>({
        visible: false,
        stock: null,
    });

    const { loading, data, stocks = [] } = state;

    React.useEffect(() => {
        fetchDetails();
    }, [code]);

    const fetchDetails = () => {
        setState((prev) => ({ ...prev, loading: true }));
        Axios.get<Inventory>(`/inventories/${code}`)
            .then((res) => {
                const { stocks = [], ...other } = res.data;

                setState((prev) => ({
                    ...prev,
                    loading: false,
                    data: other,
                    stocks,
                }));
            })
            .finally(() => {
                setState((prev) => ({ ...prev, loading: false }));
                setModel((prev) => ({ ...prev, visible: false, stock: null }));
            });
    };

    const handleOnModelClick = (visible = false) =>
        setModel((prev) => ({ ...prev, visible }));

    const handleOnRowClick = (stock: Stock) => {
        setModel((prev) => ({ ...prev, visible: true, stock }));
    };

    const handleOnModelSubmit = (values: any) => {
        const { dest, qty } = values;
        const { product } = model.stock!;

        Axios.post(`/inventories/${code}/transfer`, {
            destination: dest,
            qty,
            productCode: product.code,
        }).then((res) => {
            fetchDetails();
        });
    };

    const columns: ColumnsType<any> = [
        {
            title: "Code",
            dataIndex: ["product", "code"],
            onFilter: (value, record) =>
                record.product.code.indexOf(value) === 0,
            filters: stocks.map((row) => ({
                text: row.product.code,
                value: row.product.code,
            })),
        },
        {
            title: "Name",
            dataIndex: ["product", "name"],
        },
        {
            title: "Weight",
            dataIndex: ["product", "weight"],
        },
        {
            title: "Unit",
            dataIndex: ["product", "unit"],
        },
        {
            title: "Quantity",
            dataIndex: "qty",
            sorter: (a, b) => a.qty - b.qty,
        },
    ];

    return !loading && !data ? (
        <Empty />
    ) : (
        <>
            <Descriptions title="Inventory Info">
                <Descriptions.Item label="Name">{data?.name}</Descriptions.Item>
                <Descriptions.Item label="Code">{data?.code}</Descriptions.Item>
            </Descriptions>
            <Table
                title={() => <Title level={3}>Stocks</Title>}
                loading={loading}
                dataSource={stocks}
                columns={columns}
                rowKey="id"
                onRow={(data, index) => ({
                    onClick: (event) => {
                        handleOnRowClick(data);
                    },
                })}
            />
            <TransferInventoryModal
                visible={model.visible}
                stock={model.stock!}
                handleOnCancel={() => handleOnModelClick(false)}
                handleOnSubmit={handleOnModelSubmit}
            />
        </>
    );
};
