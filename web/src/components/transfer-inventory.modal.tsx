import { Button, Form, InputNumber, Modal, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../state";
import { InventoryReducerState } from "../state/ducks/inventory";
import { Stock } from "../types";

interface TransferInventoryModalProps {
    visible?: boolean;
    stock: Stock;
    handleOnCancel: () => void;
    handleOnSubmit: (values: any) => void;
}

export const TransferInventoryModal: React.FC<TransferInventoryModalProps> = (
    props
) => {
    const [form] = Form.useForm();
    const { visible = false, handleOnCancel, handleOnSubmit, stock } = props;

    const inventory = useSelector<ApplicationState, InventoryReducerState>(
        (state) => state.inventory
    );

    const handleOnFinish = (values: any) => {
        handleOnSubmit(values);
    };

    const qty = stock ? stock.qty : Infinity;
    return (
        <Modal
            visible={visible}
            title="Transfer Inventory"
            onOk={handleOnSubmit}
            onCancel={handleOnCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleOnFinish}>
                <Form.Item label="Destination" name="dest">
                    <Select>
                        {inventory.inventories.map((row) => {
                            return (
                                <Select.Option value={row.code} key={row.code}>
                                    {row.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="qty"
                    rules={[
                        {
                            required: true,
                            type: "number",
                            min: 1,
                            max: qty,
                        },
                    ]}
                >
                    <InputNumber min={1} max={qty} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
