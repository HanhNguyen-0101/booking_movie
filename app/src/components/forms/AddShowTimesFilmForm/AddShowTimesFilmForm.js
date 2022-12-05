import { DatePicker, Form, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setCallbackDrawer,
  setResetDrawer,
} from "../../../redux/actions/DrawerHOCAction";
import { TheaterManagementService } from "../../../redux/services/TheaterManagementService";
import { createShowtimes } from "../../../redux/actions/BookingManagementAction";
const { Option } = Select;

export default function AddShowTimesFilmForm() {
  const { t } = useTranslation();
  const { film } = useSelector((state) => state.FilmManagementReducer);
  const { theaters } = useSelector((state) => state.TheaterManagementReducer);
  const [theater, setTheater] = useState([]);

  const dispatch = useDispatch();

  const handleChangeFirst = (name) => {
    return async (value) => {
      try {
        let result =
          await TheaterManagementService.getInformationOfTheatersBySystem(value);
        setTheater(result.data.content);
      } catch (error) {
        console.log("error", error.response?.data);
      }
      formik.setFieldValue(name, value);
    };
  }

  const handleChangeSecond = (name) => {
    return value => {
      formik.setFieldValue(name, value);
    }
  }

  const onOk = (name) => {
    return value => {
      formik.setFieldValue(name, moment(value).format('DD/MM/YYYY hh:mm:ss'));
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: film.maPhim,
      maHeThongRap: null,
      maRap: null,
      ngayChieuGioChieu: "",
      giaVe: null,
    },
    validationSchema: Yup.object({
      maHeThongRap: Yup.mixed().required(t("enterTheaterSys")),
      maRap: Yup.mixed().required(t("enterTheater")),
      ngayChieuGioChieu: Yup.mixed().required(t("enterDateTime")),
      giaVe: Yup.mixed().required(t("enterPrice")),
    }),
    onSubmit: (values) => {
      dispatch(createShowtimes(values));
    },
  });

  useEffect(() => {
    dispatch(setCallbackDrawer(formik.handleSubmit));
    dispatch(setResetDrawer(formik.handleReset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <Form
      labelCol={{
        span: 8,
      }}
      layout="horizontal"
      size="default"
      labelAlign="left"
      colon={false}
      className="px-4"
      onSubmitCapture={formik.handleSubmit}
    >
      <div className="grid grid-cols-5">
        <div className="col-span-2">
          <Form.Item className="mb-1">
            <img src={film.hinhAnh} alt="..." width={200} height={100} />
          </Form.Item>
        </div>
        <div className="col-span-3">
          <Form.Item className="mb-4">
            <h3 className="uppercase font-bold text-lg">{film.tenPhim}</h3>
          </Form.Item>
          <Form.Item
            className="mb-1"
            label={
              <span className="font-bold">
                {t("theaterSys")} <span className="text-red-500">*</span>
              </span>
            }
          >
            <Select
              onChange={handleChangeFirst('maHeThongRap')}
              placeholder={t("selectTheaterSys")}
              value={formik.values.maHeThongRap}
            >
              {theaters?.map((t, idx) => (
                <Option key={idx} value={t.maHeThongRap}>
                  {t.tenHeThongRap}
                </Option>
              ))}
            </Select>
            {formik.errors.maHeThongRap ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.maHeThongRap}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item
            className="mb-1"
            label={
              <span className="font-bold">
                {t("theater")} <span className="text-red-500">*</span>
              </span>
            }
          >
            <Select value={formik.values.maRap} onChange={handleChangeSecond('maRap')} placeholder={t("selectTheater")}>
              {theater?.map((r, index) => (
                <Option key={index} value={r.maCumRap}>
                  {r.tenCumRap}
                </Option>
              ))}
            </Select>
            {formik.errors.maRap ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.maRap}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item
            className="mb-1"
            label={
              <span className="font-bold">
                {t("dateTimeShow")} <span className="text-red-500">*</span>
              </span>
            }
          >
            <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onOk={onOk('ngayChieuGioChieu')} />
            {formik.errors.ngayChieuGioChieu ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.ngayChieuGioChieu}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item
            className="mb-1"
            label={
              <span className="font-bold">
                {t("priceTicket")} <span className="text-red-500">*</span>
              </span>
            }
          >
            <InputNumber value={formik.values.giaVe}  onChange={handleChangeSecond('giaVe')} />
            {formik.errors.giaVe ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.giaVe}
              </div>
            ) : null}
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}
