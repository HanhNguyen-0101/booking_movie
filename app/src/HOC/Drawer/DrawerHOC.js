import { Button, Drawer, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { hideDrawer } from "../../redux/actions/DrawerHOCAction";

export default function DrawerHOC() {
  const {t} = useTranslation();
  const { isShowing, title, FormComponent, submitAction } = useSelector(
    (state) => state.DrawerHOCReducer
  );
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(hideDrawer());
  };
  return (
    <Drawer
      title={title}
      width={720}
      onClose={onClose}
      visible={isShowing}
      closable={false}
      bodyStyle={{
        paddingBottom: 80,
      }}
      footer={
        <Space className="float-right">
          <Button onClick={onClose} className='hover:border-red-500 hover:text-red-500 focus:border-red-500 focus:text-red-500'>
            {t('cancel')}
          </Button>
          <Button onClick={submitAction} type="danger">
            {t('confirm')}
          </Button>
        </Space>
      }
    >
      {FormComponent}
    </Drawer>
  );
}
