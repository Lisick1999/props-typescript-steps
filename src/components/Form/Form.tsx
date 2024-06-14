import React, { useState } from "react";
import { Table } from "../Table";
import '../../css/main.css';

export type TData = {
  trainingDate: string;
  distance: string;
  id: number;
};

export const Form = () => {
  const [trainingDate, setTrainingDate] = useState('');
  const [distance, setDistance] = useState('');
  const [data, setData] = useState<TData[] | []>([]);

  const convertToDateObject = (dateString: string) => {
    const parts = dateString.split(".");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
  
    return new Date(year, month, day);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trainingDate || !distance) return;

    setData((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex(item => item.trainingDate === trainingDate);

      if (index > -1) {
        newState[index].distance = (Number(newState[index].distance) + Number(distance)).toString();
      } else {
        newState.push({trainingDate, distance, id: prevState.length});
        newState.sort((a, b) => convertToDateObject(b.trainingDate).getTime() - convertToDateObject(a.trainingDate).getTime());
      }
      return newState;
    });

    setTrainingDate('');
    setDistance('');
  };

  const removeItem = (idItem: number) => {
    const newState = [...data].filter((el) => el.id !== idItem);
    setData(newState);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="data" className="table">
          <input type="text" value={trainingDate} onChange={(evt) => setTrainingDate(evt.target.value.trim())}/>
        </label>
        <label htmlFor="km" className="table">
          <input type="text" value={distance} onChange={(evt) => setDistance(evt.target.value.trim())}/>
        </label>
        <button className="formBtn" type="submit">ОК</button>
      </form>
      <div className="containerTable"><span className="firstSpan">Дата (ДД.ММ.ГГ)</span><span>Пройдено км</span><span>Действия</span></div>
      <Table data={data}
      remove={removeItem}/>
    </div>
  );
};
