import React, { useState } from 'react';
import { Table } from 'antd';

const TableComponent = (props) => {
  const { 
    selectionType = 'checkbox', 
    data = [], 
    columns = [], 
    handleDeleteManyProducts,
    handleDeleteManyUsers,
  } = props;

  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys: rowSelectedKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    }
  };

  const handleDeleteAll = () => {
    if (rowSelectedKeys.length === 0) return;

      const handler = handleDeleteManyProducts || handleDeleteManyUsers;
        if (handler) {
          handler(rowSelectedKeys); 
          setRowSelectedKeys([]); 
    } else {
      console.error("Error: Neither handleDeleteManyProducts nor handleDeleteManyUsers prop was provided.");
    }
   };

  return (
    <div>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            background: '#1d1ddd',
            color: '#fff',
            fontWeight: 'bold',
            padding: '10px',
            cursor: 'pointer'
          }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}

      <Table
        rowKey="_id"   // 🔥 THÊM DÒNG NÀY
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default TableComponent;
