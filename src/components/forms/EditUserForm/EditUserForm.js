import { Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setCallbackDrawer,
} from "../../../redux/actions/DrawerHOCAction";
import { GROUP } from "../../../utils/configSetting";
import { capNhatNguoiDung, layDanhSachLoaiNguoiDung } from "../../../redux/actions/UserManagementAction";
const { Option } = Select;

export default function EditUserForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { nguoiDung, dsLoaiNguoiDung } = useSelector(
    (state) => state.UserManagementReducer
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: nguoiDung[0]?.taiKhoan,
      matKhau: nguoiDung[0]?.matKhau,
      email: nguoiDung[0]?.email,
      soDt: nguoiDung[0]?.soDt,
      maNhom: GROUP,
      maLoaiNguoiDung: nguoiDung[0]?.maLoaiNguoiDung,
      hoTen: nguoiDung[0]?.hoTen,
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().max(30, t("30Char")).required(t("enterAccount")),
      matKhau: Yup.string().required(t("enterPassword")),
      maLoaiNguoiDung: Yup.mixed().required(t("enterUsertype")),
      hoTen: Yup.string().max(30, t("30Char")).required(t("enterUsername")),
      email: Yup.string().email(t("enterEmail1")),
      soDt: Yup.string().matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        t('enterPhone1')
      ),
    }),
    onSubmit: (values) => {
      dispatch(capNhatNguoiDung(values));
    },
  });

  useEffect(() => {
    dispatch(setCallbackDrawer(formik.handleSubmit));
    dispatch(layDanhSachLoaiNguoiDung());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      labelCol={{
        span: 5,
      }}
      layout="horizontal"
      size="default"
      labelAlign="left"
      colon={false}
      className="px-4"
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold">
            {t("account")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          value={formik.values.taiKhoan}
          placeholder={t("enterAccount1")}
          disabled
        />
        {formik.errors.taiKhoan ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.taiKhoan}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold">
            {t("username")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          value={formik.values.hoTen}
          placeholder={t("enterUsername1")}
        />
        {formik.errors.hoTen ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.hoTen}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold">
            {t("typeUser")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Select
          onChange={formik.handleChange}
          name="maLoaiNguoiDung"
          value={formik.values.maLoaiNguoiDung}
        >
          {dsLoaiNguoiDung?.map((type, idx) => {
            return (
              <Option key={idx} value={type.maLoaiNguoiDung}>
                {type.tenLoai}
              </Option>
            );
          })}
        </Select>
        {formik.errors.maLoaiNguoiDung ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.maLoaiNguoiDung}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold">
            {t("password")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input.Password
          name="matKhau"
          placeholder={t("enterPassword1")}
          onChange={formik.handleChange}
          value={formik.values.matKhau}
        />
        {formik.errors.matKhau ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.matKhau}
          </div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold">{t("email")}</span>}
      >
        <Input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder={t("enterEmail")}
        />
        {formik.errors.email ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.email}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold">{t("phone")}</span>}
      >
        <Input
          name="soDt"
          onChange={formik.handleChange}
          value={formik.values.soDt}
          placeholder={t("enterPhone")}
        />
        {formik.errors.soDt ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.soDt}</div>
        ) : null}
      </Form.Item>
    </Form>
  );
}
