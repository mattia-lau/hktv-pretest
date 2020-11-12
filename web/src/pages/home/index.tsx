import { Checkbox, Steps, Typography } from "antd";
import React from "react";
const { Text, Paragraph, Title } = Typography;
const { Step } = Steps;

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = (props) => {
    return (
        <div className="home">
            <div>
                <Paragraph>
                    Due to the time limitation, this is all my best effort.
                </Paragraph>
                <Paragraph>
                    Try to click the table row in every table to see the magic.
                </Paragraph>
            </div>
            <div>
                <Title level={2}>Function List</Title>
                <Checkbox defaultChecked style={{ display: "block" }}>
                    develop a light version Warehouse Inventory System
                </Checkbox>
                <Checkbox defaultChecked style={{ display: "block" }}>
                    able to store product data via csv file consumption.
                </Checkbox>
                <Checkbox defaultChecked style={{ display: "block" }}>
                    able to store quantities of such products in different
                    locations via csv file consumption.
                </Checkbox>
                <Checkbox defaultChecked style={{ display: "block" }}>
                    UI to show inventory level of given product code
                </Checkbox>
                <Checkbox defaultChecked style={{ display: "block" }}>
                    able to transfer inventory from one location to another
                    given amount of quantity and product code via UI
                </Checkbox>
                <Checkbox defaultChecked style={{ display: "block" }}>
                    able to transfer inventory from one location to another
                    given amount of quantity and product code via upload Csv
                </Checkbox>
            </div>
            <div>
                <Title level={2}>Dairy</Title>
                <Steps direction="vertical" current={3}>
                    <Step
                        title="Day1"
                        description="Create the Spring Boot Project, and try to create a Hello World API Controlelr."
                    />
                    <Step
                        title="Day2"
                        description="Connect with database and Create all RestController with Real Data and data validation."
                    />
                    <Step
                        title="Day3"
                        description="Create the React App and migrate the API as well as documentations."
                    />
                </Steps>
            </div>
        </div>
    );
};

export default HomePage;
