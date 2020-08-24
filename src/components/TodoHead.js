import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {
  const todos = useTodoState();
  const undoneTasks = todos.filter(todo => !todo.done);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
  // const dateArr = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Vienes', 'Sábado', 'Domingo']
  // let date = today.getDate();
  // let month = '';
  // let year = today.getFullYear();
  // let dayName = '';
  // switch(today.getMonth() + 1) {
  //   case 1: month = 'enero'; break;
  //   case 2: month = 'febrero'; break;
  //   case 3: month = 'marzo'; break;
  //   case 4: month = 'abril'; break;
  //   case 5: month = 'mayo'; break;
  //   case 6: month = 'junio'; break;
  //   case 7: month = 'julio'; break;
  //   case 8: month = 'agosto'; break;
  //   case 9: month = 'septiembre'; break;
  //   case 10: month = 'octubre'; break;
  //   case 11: month = 'nobiembre'; break;
  //   case 12: month = 'diciembre'; break;
  // }
  // switch(today.getDay()) {
  //   case 0: dayName = 'Domingo'; break;
  //   case 1: dayName = 'Lunes'; break;
  //   case 2: dayName = 'Martes'; break;
  //   case 3: dayName = 'Miércoles'; break;
  //   case 4: dayName = 'Jueves'; break;
  //   case 5: dayName = 'Vienes'; break;
  //   case 6: dayName = 'Sábado'; break;
  // }
  // const dateString = 'El ' + date + ' de ' + month + ' de ' + year;

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일이 {undoneTasks.length} 개 남았습니다.</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;