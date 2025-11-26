import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';

const TableComponent = (props) => {
    const { selectionType = 'checkbox' }=props

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`Selected row keys: ${selectedRowKeys}`, 'Selected rows: ', selectedRows);
    },
    getCheckboxProps: (record)=>({
        disabled: record.name === 'Disabled User',
        name: record.name
    })
  };

  return (
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
  );
};

export default TableComponent;
