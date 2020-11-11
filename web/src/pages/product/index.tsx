import { Button, notification, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import Axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CreateProductModal } from "../../components";
import { ApplicationState } from "../../state";
import {
  fetchProductAsync,
  ProductReducerState,
} from "../../state/ducks/product";
import { createProductAsync } from "../../state/ducks/product/";
import { Product } from "../../types";
const { Title } = Typography;

interface ProductPageProps {}

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
  {
    title: "Weight",
    dataIndex: "weight",
  },
  {
    title: "Unit",
    dataIndex: "unit",
  },
];

export const ProductPage: React.FC<ProductPageProps> = (props) => {
  const [state, setState] = React.useState({
    createProduct: false,
  });

  const product = useSelector<ApplicationState, ProductReducerState>(
    (s) => s.product
  );

  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(fetchProductAsync.request({}));
  }, [dispatch]);

  const onCreateProductClick = (visible = false) => {
    setState({
      ...state,
      createProduct: visible,
    });
  };

  const handleOnCreateProductSubmit = (values: any) => {
    dispatch(createProductAsync.request(values));
    onCreateProductClick(false);
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

    Axios.post<Product[]>("/products/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      dispatch(createProductAsync.success(res.data));
      notification.open({
        type: "success",
        message: "Add Products Successful",
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
      <div className="product-actions">
        <Button type="primary" onClick={() => onCreateProductClick(true)}>
          Create Product
        </Button>
        <Button type="primary" onClick={handleOnUploadCsvClick}>
          Upload CSV
        </Button>
      </div>
      <Table
        title={() => <Title level={3}>Product List</Title>}
        columns={columns}
        rowKey="code"
        dataSource={product.products}
        loading={product.loading}
        onRow={(data, index) => ({
          onClick: (event) => {
            history.push(`/products/${data.code}`);
          },
        })}
      />
      <CreateProductModal
        visible={state.createProduct}
        handleOnCancel={() => onCreateProductClick()}
        handleOnSubmit={handleOnCreateProductSubmit}
      />
    </>
  );
};

export default ProductPage;
