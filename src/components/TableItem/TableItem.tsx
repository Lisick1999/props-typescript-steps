import React from "react";
import { TData } from "../Form";
import '../../css/main.css';

interface IProps {
  item: TData,
  remove: (idItem: number) => void
};

export const TableItem = (props: IProps) => {
  const {item, remove} = props;

  return (
    <div className="item-list">
      <span>{item.trainingDate}</span><span>{item.distance}</span>
      <button onClick={() => remove(item.id)}>x</button>
    </div>
  );
};
