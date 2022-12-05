import React from "react";
import { Rate, Progress } from "antd";

export default function Circle({ percent = 0 }) {
  return (
    <div className="text-center d-flex flex-col items-center">
      <Progress
        type="circle"
        percent={percent * 10}
        format={(percent) => `${percent}%`}
        strokeColor={{
          "0%": "rgb(243 229 12)",
          "100%": "rgb(240 28 28)",
        }}
      />
      <Rate
        style={{ fontSize: 30 }}
        className="pt-3"
        allowHalf
        value={percent / 2}
      />
    </div>
  );
}
