import React, { useCallback, useState } from 'react';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { Paper, Checkbox, FormControlLabel, IconButton, Button, Dialog, TextField } from '@mui/material';
import SportsBarOutlinedIcon from '@mui/icons-material/SportsBarOutlined';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  background-image: linear-gradient(135deg, white, lightblue, darkblue); 
  height: 100vh;
`;
const PaperContainer = styled(Paper)`
  height: 500px;
  width: 330px;
  background-color: white;
  margin: auto;
`;
const TodoContainer = styled(PaperContainer)`
  padding: 20px;
  height: 460px;
  width: 580px;
`;
const Title = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-end;
`;
const DayText = styled.div`
  font-size: 30px;
  font-weight: 800;
`;
const DateText = styled.div`
  padding-bottom: 4px;
`;
const TodoItemContainer = styled(FlexDiv)`
  text-decoration: ${props => props.done ? 'line-through' : 'none'};
  color: ${props => props.done ? '#1976d2' : 'black'};
`;
const InputModal = styled.div`
  &&{
    padding: 10px 20px;
  }
`;

const App = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate)
  };

  const [modal, setModal] = useState(false);
  const [todoText, setTodoText] = useState('');
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      date: 'Thu Jul 28 2022',
      todo: '퇴근',
      done: false
    },
    {
      id: 2,
      date: 'Thu Jul 28 2022',
      todo: '야근',
      done: true
    }
  ]);

  const onModalOpen = () => {
    setModal(true)
  };
  const onModalClose = () => {
    setModal(false)
  };
  const onTodoTextChange = (e) => {
    setTodoText(e.target.value)
  };

  /** onInsert : 새로운 투두 리스트를 등록합니다. */
  const onInsert = useCallback(() => {
    var newTodo = {
      id: todoLists.length + 1,
      date: date.toDateString(),
      todo: todoText,
      done: false
    };
    // Array.concat 함수를 이용하여 새로운 투두리스트를 등록합니다.
    setTodoLists(todoLists.concat(newTodo))
    onModalClose();
    setTodoText('');
  },[todoLists, date, todoText]);

  /** onTodoToggle : 투두리스트 확인 함수 */
  const onTodoToggle = useCallback((id) => {

    
    // Array.map 함수를 이용하여 생성된 리스트에서 선택된 리스트의 done 변수값을 true -> false, false -> true로 바꿉니다.
    var newTodo = todoLists.map(todoLists.done? onModalClose : onModalOpen);
    // {newTodo.done? onModalClose : onModalOpen};
    setTodoLists(newTodo)
  },[todoLists]);

  /** onTodoDelete : 투두리스트 삭제 함수 */
  const onTodoDelete = useCallback((id)=> {
    // Array.filter 함수를 이용하여 생성된 리스트에서 선택된 리스트를 제거합니다.
    var newTodo = todoLists.filter((todo)=>todo.id!==id);
    setTodoLists(newTodo)
  },[todoLists]);

  return (
    <>
      <Container>
        <PaperContainer square elevation={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker date={date} onChange={(newDate) => onDateChange(newDate)} />
          </LocalizationProvider>    
        </PaperContainer>
        <TodoContainer square elevation={3}>
          <Title>
            <DayText>
              {date.toDateString().split(' ')[0]}
            </DayText>
            <DateText>
              {date.toDateString().slice(4)}
            </DateText>
          </Title>
          <hr />
          <div style={{height:'360px'}}>
            {todoLists.length !== 0 ? todoLists.filter(list=> list.date === date.toDateString()).map(list => (
              <TodoItemContainer 
                done={list.done}
                key={list.id}
              > 
                <FormControlLabel 
                  label={list.todo} 
                  control={
                    <Checkbox 
                      checked={list.done}
                      onChange={()=>onTodoToggle(list.id)} // 투두리스트 확인 클릭 이벤트
                      icon={<SportsBarOutlinedIcon />} 
                      checkedIcon={<SportsBarIcon />} 
                    />
                  }
                />
                <IconButton
                  onClick={()=>onTodoDelete(list.id)} // 삭제 이벤트
                > 
                  <DeleteIcon />
                </IconButton>
              </TodoItemContainer>
            )) : null}
          </div>
          <hr />
          <FlexDiv style={{alignItems:'center'}}>
            <div>
              {todoLists.filter(list=>list.date === date.toDateString()).length} 
              TASK
            </div>
            <Button endIcon={<AddIcon />} onClick={onModalOpen}>ADD NEW</Button>
          </FlexDiv>
        </TodoContainer>  
      </Container>
      <Dialog
        open={modal}
        onClose={onModalClose}
        maxWidth='xs'
        fullWidth
      >
        <InputModal>
        <div style={{paddingBottom: '10px'}}>
          새로운 Todo를 입력하세요
        </div>
          <TextField type="text" value={todoText} onChange={onTodoTextChange} size='small' fullWidth/>
          <Button variant='outlined' style={{marginTop:'10px', float: 'right'}} onClick={onInsert} >ADD</Button>
        </InputModal>
      </Dialog>
    </>
  );
};

export default App;