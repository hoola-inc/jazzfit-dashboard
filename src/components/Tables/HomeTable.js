import React from "react";
import { Table,Row, Col } from "antd";
import PieChart from "../charts/PieChart";
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "productName",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Age",
    dataIndex: "productDetail",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "productImage",
    key: "address"
    
  }

  // {
  //   title: "Tags",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: tags => (
  //     <span>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? "geekblue" : "green";
  //         if (tag === "loser") {
  //           color = "volcano";
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </span>
  //   )
  // },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (text, record) => (
  //     <span>
  //       <a>Invite {record.name}</a>
  //       <Divider type="vertical" />
  //       <a>Delete</a>
  //     </span>
  //   )
  // }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    
    
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      console.log(`Myselected row: ${selectedRows[0]._id}`);
    axios.delete(`http://localhost:9000/product/${selectedRows[0]._id}`) 
    
   },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"]
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"]
//   }
// ];
class HomeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataArray: []
    };
  }

  componentDidMount() {
    this.getProductData();
  }

  getProductData = async () => {
    try {
      const getProducts = await axios.get(
        "http://localhost:9000/product"
      );

      if (getProducts) {
        if(getProducts.data.success) {
          this.setState({
            dataArray: getProducts.data.data
          })
        } else {
          console.log(' internal server error ');
        }
      } else {
        console.log(' API call error ');
      }
    } catch (error) {}
  };

  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col span={12}>
            <Table
              style={{ padding: 50 }}
              columns={columns}
              dataSource={this.state.dataArray}
              pagination={true}
              rowSelection={rowSelection}
           
              
            />
          </Col>

          <Col span={12}>
            <Table
              style={{ padding: 50 }}
              columns={columns}
              dataSource={this.state.dataArray}
              pagination={true}
            />
            {/* <PieChart/> */}
          </Col>
        </Row>
      </div>
    );
  }
}
export default HomeTable;
