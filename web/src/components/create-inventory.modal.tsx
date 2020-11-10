import { Button, Form, Input, Modal } from "antd";
import React from "react";

interface CreateInventoryModalProps {
    visible?: boolean;

    handleOnCancel: () => void;
    handleOnSubmit: (values: any) => void;
}

export const CreateInventoryModal: React.FC<CreateInventoryModalProps> = (
    props
) => {
    const [form] = Form.useForm();
    const { visible = false, handleOnCancel, handleOnSubmit } = props;

    const handleOnFinish = (values: any) => {
        handleOnSubmit(values);
    };

    return (
        <Modal
            visible={visible}
            title="Create Inventory"
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
                    <Input placeholder="Input inventory's code" />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Input inventory's name" />
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
