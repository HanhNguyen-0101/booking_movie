import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setCallbackDrawer,
  setResetDrawer,
} from "../../../redux/actions/DrawerHOCAction";
import {
  editFilm,
} from "../../../redux/actions/FilmManagementAction";

export default function EditFilmForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const { film } = useSelector((state) => state.FilmManagementReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: film?.maPhim,
      maNhom: film?.maNhom,
      tenPhim: film?.tenPhim,
      trailer: film?.trailer,
      moTa: film?.moTa,
      ngayKhoiChieu: film?.ngayKhoiChieu,
      sapChieu: film?.sapChieu,
      dangChieu: film?.dangChieu,
      hot: film?.hot,
      danhGia: film?.danhGia,
      hinhAnh: null,
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().max(100, t("100Char")).required(t("enterName")),
      moTa: Yup.string().required(t("enterDesc")),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(editFilm(formData));
    },
  });

  const handleChangeWithName = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeDatePicker = (name) => {
    return (value) => {
      formik.setFieldValue(name, moment(value));
    };
  };
  const handleChangeImageSrc = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  useEffect(() => {
    dispatch(setCallbackDrawer(formik.handleSubmit));
    dispatch(setResetDrawer(formik.handleReset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      className="px-4"
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold">
            {t("name")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
        {formik.errors.tenPhim ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.tenPhim}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold">{t("trailer")}</span>}
      >
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item
        className="mb-3"
        label={
          <span className="font-bold">
            {t("filmDesc")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <TextArea
          name="moTa"
          onChange={formik.handleChange}
          rows={4}
          value={formik.values.moTa}
        />
        {formik.errors.moTa ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.moTa}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold">{t("filmDate")}</span>}
      >
        <DatePicker
          onChange={handleChangeDatePicker("ngayKhoiChieu")}
          format="DD/MM/yyyy"
          disabled
          value={moment(formik.values.ngayKhoiChieu)}
        />
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold">{t("showing")}</span>}
        valuePropName="checked"
      >
        <Switch
          onChange={handleChangeWithName("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold">{t("coming")}</span>}
        valuePropName="checked"
      >
        <Switch
          onChange={handleChangeWithName("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold">{t("hot")}</span>}
        valuePropName="checked"
      >
        <Switch
          onChange={handleChangeWithName("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={<span className="font-bold">{t("star")}</span>}
      >
        <InputNumber
          min={0}
          max={10}
          value={formik.values.danhGia}
          onChange={handleChangeWithName("danhGia")}
        />
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold">
            {t("filmImg")} <span className="text-red-500">*</span>
          </span>
        }
      >
        <input
          type="file"
          onChange={handleChangeImageSrc}
          accept="image/png, image/jpeg,image/gif,image/png"
        />
        {(imgSrc || film.hinhAnh) && (
          <img
            alt="img"
            src={imgSrc === "" ? film.hinhAnh : imgSrc}
            className="w-auto my-3"
          />
        )}
      </Form.Item>
    </Form>
  );
}
