"use client";
import { Table, Button, Space, Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { deleteInfo, PersonalInfo, setSelectedPerson, setSelectedRowKeys } from "../../feature/todo";
import {  useEffect } from "react";
import { useTranslation } from "react-i18next";

const PersonTable: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const persons = useAppSelector((state) => state.form.data as PersonalInfo[]);
  const selectedRowKeys = useAppSelector((state) => state.form.selectedRowKeys) as string[];



  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      dispatch(setSelectedRowKeys(keys as string[]));
    },
  };
  const columns = [
    {
      title: t("table.name"),
      dataIndex: "firstName",
      key: "name",
      render: (_: unknown, record: PersonalInfo) => `${record.firstName} ${record.lastName}`
    },
    { title: t("table.gender"), dataIndex: "gender", key: "gender" },
    { title: t("table.mobilePhone"), dataIndex: "mobilePhone", key: "mobilePhone" },
    { title: t("table.nationality"), dataIndex: "nationality", key: "nationality" },
    {
      title: t("table.manage"),
      key: "actions",
      render: (_: unknown, record: PersonalInfo) => (
        <Space>
          <Button type="primary" onClick={() => dispatch(setSelectedPerson(record))}>EDIT</Button>
          <Button danger onClick={() => dispatch(deleteInfo([record.id]))}>DELETE</Button>
          </Space>
      ),
    },
  ];
  const handleDeleteSelected = () => {
    if (selectedRowKeys.length > 0) {
      dispatch(deleteInfo(selectedRowKeys as string[])); 
    } else {
      alert("Please select at least one person to delete");
    }
  };
  
  useEffect(() => {
    dispatch(setSelectedRowKeys([]));
  }, [persons, dispatch]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      padding: "50px",
      borderRadius: "10px",
    }}>
      <div>
        <Checkbox
          checked={selectedRowKeys.length === persons.length}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              dispatch(setSelectedRowKeys(persons.map((person) => person.id)));
            } else {
              dispatch(setSelectedRowKeys([]));
            }
          }}
        >
          {t("table.selectAll")}
        </Checkbox>
        <Button danger onClick={handleDeleteSelected}>
          {t("table.delete")}
        </Button>
      </div>

      <Table

        columns={columns}
        dataSource={persons}
        rowKey="id"
        rowSelection={rowSelection}
        pagination={{ pageSize: 5 }}
        style={{ background: "white", borderRadius: "10px" }}
      />
    </div>
  );
};

export default PersonTable;
