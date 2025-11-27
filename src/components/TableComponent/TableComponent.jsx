import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data=[], columns=[] }=props



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
        {...props}
      />
  );
};

export default TableComponent;
