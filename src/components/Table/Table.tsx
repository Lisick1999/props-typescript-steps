import React from "react";
import { TData } from "../Form";
import { TableItem } from "../TableItem";
import '../../css/main.css';

interface IProps {
  data: TData[] | [],
  remove: (idItem: number) => void,
};

export const Table = (props: IProps) => {
  const { data, remove } = props;

  return (
    <div className="item-list-container">
      {data.map((el) => 
        <TableItem
          item={el}
          key={el.id}
          remove={remove}
        />
      )}
    </div>
  );
};
