import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import React from "react";

interface CreateProuctModalProps {
    visible?: boolean;

    handleOnCancel: () => void;
    handleOnSubmit: (values: any) => void;
}

export const CreateProductModal: React.FC<CreateProuctModalProps> = (props) => {
    const [form] = Form.useForm();
    const { visible = false, handleOnCancel, handleOnSubmit } = props;

    const handleOnFinish = (values: any) => {
        handleOnSubmit(values);
    };

    return (
        <Modal
            visible={visible}
            title="Create Product"
            onOk={handleOnSubmit}
            onCancel={handleOnCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleOnFinish}>
                <Form.Item
                    label="Code"
                    name="code"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Input product's code" />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Input product's name" />
                </Form.Item>
                <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[{ required: true, type: "number" }]}
                >
                    <InputNumber
                        placeholder="Input product's weight"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item
                    label="Unit"
                    name="unit"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Select unit">
                        <Select.Option value="G">G</Select.Option>
                        <Select.Option value="KG">KG</Select.Option>
                        <Select.Option value="M">M</Select.Option>
                        <Select.Option value="ML">ML</Select.Option>
                    </Select>
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
