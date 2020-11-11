import { Button, notification, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import Axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CreateInventoryModal } from "../../components";
import { ApplicationState } from "../../state";
import {
    createInventoryAsync,
    fetchInventoryAsync,
    InventoryReducerState,
} from "../../state/ducks/inventory";

const { Title } = Typography;

const columns: ColumnsType<any> = [
    {
        title: "Code",
        dataIndex: "code",
        sorter: (a, b) => a.code.length - b.code.length,
    },
    {
        title: "Name",
        dataIndex: "name",
    },
];

interface State {
    createInventory: boolean;
}

export const InventoryPage: React.FC = () => {
    const dispatch = useDispatch();

    const inventory = useSelector<ApplicationState, InventoryReducerState>(
        (state) => state.inventory
    );

    const [state, setState] = React.useState<State>({
        createInventory: false,
    });
    const history = useHistory();

    React.useEffect(() => {
        dispatch(fetchInventoryAsync.request({}));
    }, [dispatch]);

    const onCreateInventoryClick = (visible = false) => {
        setState({
            ...state,
            createInventory: visible,
        });
    };

    const handleOnCreateInventorySubmit = (values: any) => {
        dispatch(createInventoryAsync.request(values));
        onCreateInventoryClick(false);
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

        Axios.post("/inventories/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            dispatch(fetchInventoryAsync.request({}));
            notification.open({
                type: "success",
                message: "Add Inventories Successful",
            });
        });
    };

    return (
        <>
            <input
                type="file"
                style={{ display: "none" }}
                ref={ref}
                onChange={onFileChange}
                multiple={false}
                accept=".csv"
            />
            <div className="inventory-actions">
                <Button
                    type="primary"
                    onClick={() => onCreateInventoryClick(true)}
                >
                    Create Inventory
                </Button>
                <Button type="primary" onClick={handleOnUploadCsvClick}>
                    Upload CSV
                </Button>
            </div>
            <Table
                title={() => <Title level={2}>Inventory</Title>}
                columns={columns}
                dataSource={inventory.inventories}
                loading={inventory.loading}
                rowKey="code"
                onRow={(data, index) => ({
                    onClick: (event) => {
                        console.log(data);
                        history.push(`/inventories/${data.code}`);
                    },
                })}
            />

            <CreateInventoryModal
                visible={state.createInventory}
                handleOnCancel={() => onCreateInventoryClick(false)}
                handleOnSubmit={handleOnCreateInventorySubmit}
            />
        </>
    );
};
