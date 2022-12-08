import { Button, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GROUP } from "../../../utils/configSetting";
import { capNhatTaiKhoan } from "../../../redux/actions/UserManagementAction";

export default function UpdateAccountForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {userLogin, thongTinTaiKhoan} = useSelector(
    (state) => state.UserManagementReducer
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinTaiKhoan?.taiKhoan,
      matKhau: thongTinTaiKhoan?.matKhau,
      email: thongTinTaiKhoan?.email,
      soDt: thongTinTaiKhoan?.soDT,
      maNhom: GROUP,
      hoTen: thongTinTaiKhoan?.hoTen,
      maLoaiNguoiDung: userLogin?.maLoaiNguoiDung
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().max(30, t("30Char")).required(t("enterAccount")),
      matKhau: Yup.string().required(t("enterPassword")),
      hoTen: Yup.string().max(30, t("30Char")).required(t("enterUsername")),
      email: Yup.string().email(t("enterEmail1")),
      soDt: Yup.string().matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        t("enterPhone1")
      ),
    }),
    onSubmit: (values) => {
        dispatch(capNhatTaiKhoan(values));
    },
  });

  return (
    <Form
      labelCol={{
        span: 5,
      }}
      layout="horizontal"
      size="default"
      labelAlign="left"
      colon={false}
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
      <Form.Item className="mt-2" label=" ">
        <Button type="primary" className="w-full my-3" htmlType="submit">
          <span className="uppercase font-bold">{t("editUser")}</span>
        </Button>
      </Form.Item>
    </Form>
  );
}
