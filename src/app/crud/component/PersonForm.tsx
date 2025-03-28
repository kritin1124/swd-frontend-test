"use client";
import { Form, Input, Button, Select, DatePicker, Radio, Row, Col, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { addInfo, PersonalInfo, setSelectedPerson, updateInfo } from "../../feature/todo";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const { Option } = Select;

const PersonalInfoForm: React.FC = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const selectedPerson = useAppSelector((state) => state.form.selectedPerson);
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedPerson) {
            form.setFieldsValue({
                ...selectedPerson,
                birthday: dayjs(selectedPerson.birthday),
            });
        } else {
            form.resetFields();
        }
    }, [selectedPerson]);

    const onFinish = (values: Pick<PersonalInfo, "title" | "firstName" | "lastName" | "birthday" | "nationality" | "citizenId" | "gender" | "mobilePhone" | "passportNo" | "expectedSalary">) => {
        const updatedValues = {
            ...values, birthday: dayjs.isDayjs(values.birthday)
                ? values.birthday.format("YYYY-MM-DD") 
                : values.birthday,
        };

        if (selectedPerson) {
            dispatch(updateInfo({ ...selectedPerson, ...updatedValues }));
            dispatch(setSelectedPerson(null));
        } else {
            dispatch(addInfo({ id: uuidv4(), ...updatedValues }));
        }
        form.resetFields();
        alert("Submitted successfully");

    };


    return (
        <Form
            form={form}
            onFinish={onFinish}
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <div style={{
                border: '1px solid #000000',
                backgroundColor: 'transparent',
                padding: '30px',
                borderRadius: '10px',
                width: '100%',
                maxWidth: '800px',
                height: '100%'
            }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <Form.Item
                        label={t("crud.titleName")}
                        name="title"
                        rules={[{ required: true, message: "Please select title" }]}
                    >

                        <Select placeholder={t("crud.titleName")}>
                            <Option value="Mr.">{t("crud.MrName")}</Option>
                            <Option value="Ms.">{t("crud.MsName")}</Option>
                            <Option value="Mrs.">{t("crud.MrsName")}</Option>
                        </Select>

                    </Form.Item>

                    <Form.Item
                        label={t("crud.firstName")}
                        name="firstName"
                        style={{ width: '35%' }}
                        rules={[{ required: true, message: "Please enter first name" }]}
                    >
                        <Input id="firstName"/>
                    </Form.Item>

                    <Form.Item
                        label={t("crud.lastName")}
                        name="lastName"
                        style={{ width: '35%' }}
                        rules={[{ required: true, message: "Please enter last name" }]}
                    >
                        <Input id="lastName"/>
                    </Form.Item>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <Form.Item
                        label={t("crud.birthday")}
                        name="birthday"
                        rules={[{ required: true, message: "Please select birthday" }]}
                    >
                        <DatePicker

                            placeholder={t("crud.birthDate")}
                            format="MM/DD/YYYY"
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("crud.nationality")}
                        name="nationality"
                        rules={[{ required: true, message: "Please select nationality" }]}
                        style={{ width: '50%' }}
                    >
                        <Select placeholder={t("crud.select")} >
                            <Option value="Thai">{t("crud.thai")}</Option>
                            <Option value="American">{t("crud.american")}</Option>
                            <Option value="French">{t("crud.french")}</Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item label={t("crud.citizenId")} name="citizenId">
                    <Space.Compact>
                        <Input style={{ width: "10%" }} maxLength={1} />
                        <span style={{ padding: "0 5px" }}>-</span>
                        <Input style={{ width: "20%" }} maxLength={4} />
                        <span style={{ padding: "0 5px" }}>-</span>
                        <Input style={{ width: "25%" }} maxLength={5} />
                        <span style={{ padding: "0 5px" }}>-</span>
                        <Input style={{ width: "15%" }} maxLength={2} />
                        <span style={{ padding: "0 5px" }}>-</span>
                        <Input style={{ width: "10%" }} maxLength={1} />
                    </Space.Compact>
                </Form.Item>


                <Form.Item
                    label={t("crud.gender")}
                    name="gender"
                    style={{ marginBottom: '10px' }}
                    required={true}
                >
                    <Radio.Group>
                        <Radio value="Male">{t("crud.male")}</Radio>
                        <Radio value="Female">{t("crud.female")}</Radio>
                        <Radio value="Unisex">{t("crud.unsex")}</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label={t("crud.mobilePhone")} name="mobilePhone" required={true}>
                    <Input id = "mobilePhone" style={{ width: "60%" }} />
                </Form.Item>

                <Form.Item
                    label={t("crud.passportNo")}
                    name="passportNo"
                    style={{ width: '50%' }}
                >
                    <Input  id="passportNo"/>
                </Form.Item>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            required={true}
                            label={t("crud.expectedSalary")} name="expectedSalary">
                            <Input  id="expectedSalary"/>
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={4}  >
                        <Row style={{ justifyContent: 'space-evenly' }}>
                            <Button type="default" htmlType="reset">{t("crud.reset")}</Button>
                            <Button type="primary" htmlType="submit">{t("crud.submit")}</Button>
                        </Row>
                    </Col>

                </Row>
            </div>
        </Form>
    );
};

export default PersonalInfoForm;
