import { Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import Axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../state";
import { InventoryReducerState } from "../../state/ducks/inventory";
import { History } from "../../types";
const { Title } = Typography;

interface HistoryPageProps {}

interface State {
    loading: boolean;
    data: History[];
}

export const HistoryPage: React.FC<HistoryPageProps> = (props) => {
    const [state, setState] = React.useState<State>({
        loading: false,
        data: [],
    });

    const inventory = useSelector<ApplicationState, InventoryReducerState>(
        (s) => s.inventory
    );

    const columns: ColumnsType<any> = [
        {
            title: "From",
            dataIndex: ["from", "inventory", "code"],
            filters: inventory.inventories.map((row) => ({
                text: row.name,
                value: row.code,
            })),
        },
        {
            title: "To",
            dataIndex: ["to", "inventory", "code"],
            filters: inventory.inventories.map((row) => ({
                text: row.name,
                value: row.code,
            })),
        },
        {
            title: "Product",
            dataIndex: ["product", "code"],
        },
        {
            title: "Quantity",
            dataIndex: ["qty"],
        },
        {
            title: "Time",
            dataIndex: "createdAt",
            render: (value) => {
                return <>{dayjs(value).format("YYYY-MM-DD HH:mm:ss")}</>;
            },
            sorter: (a, b) =>
                dayjs(a.createdAt).toDate().getTime() -
                dayjs(b.createdAt).toDate().getTime(),
            defaultSortOrder: "descend",
        },
    ];

    React.useEffect(() => {
        setState((prev) => ({ ...prev, loading: true }));

        Axios.get<History[]>("/transfers")
            .then((res) => {
                setState((prev) => ({ ...prev, data: res.data }));
            })
            .finally(() => setState((prev) => ({ ...prev, loading: false })));
    }, []);

    return (
        <Table
            title={() => <Title level={2}>History</Title>}
            columns={columns}
            dataSource={state.data}
            loading={state.loading}
            rowKey="createdAt"
        />
    );
};

export default HistoryPage;
