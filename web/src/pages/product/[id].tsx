import { Descriptions, Empty, notification, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import Axios from "axios";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Product, Stock } from "../../types";

const { Title } = Typography;

interface State {
  loading: boolean;
  data: Product | null;
}

const columns: ColumnsType<any> = [
  {
    title: "Inventory",
    dataIndex: ["inventory", "name"],
  },
  {
    title: "Code",
    dataIndex: ["inventory", "code"],
  },
  {
    title: "Quantity",
    dataIndex: "qty",
    sorter: (a, b) => a.qty - b.qty,
  },
];

export const ProductDetailsPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  const history = useHistory();

  const [state, setState] = React.useState<State>({
    loading: false,
    data: null,
  });

  React.useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    Axios.get<Product | null>(`/products/${code}`)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          data: res.data,
        }));
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));

    notification.info({
      message: "Click the Table row to check the inventory stocks",
      duration: 1.5,
    });
  }, [code]);

  const { loading, data } = state;

  return !loading && !data ? (
    <Empty />
  ) : (
    <>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Name">{data?.name}</Descriptions.Item>
        <Descriptions.Item label="Code">{data?.code}</Descriptions.Item>
        <Descriptions.Item label="Weight">
          {data?.weight}
          {data?.unit}
        </Descriptions.Item>
      </Descriptions>
      <Table
        title={() => <Title level={3}>Inventory</Title>}
        rowKey="id"
        columns={columns}
        dataSource={state.data?.stocks || []}
        onRow={(data: Stock, index) => ({
          onClick: (event) => {
            history.push(`/inventories/${data.inventory.code}`);
          },
        })}
      />
    </>
  );
};
