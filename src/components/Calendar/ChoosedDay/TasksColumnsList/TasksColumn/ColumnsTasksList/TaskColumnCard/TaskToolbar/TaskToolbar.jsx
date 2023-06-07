import Icons from 'images/sprite.svg';
import {
  BtnArrow,
  BtnStyled,
  ChouseCat,
  InputStyled,
  LabelStyled,
  ToolBarItem,
  Wraper,
} from './TaskToolbar.Styled';
import TaskModal from '../../../TaskModal/TaskModal';

import { deleteTask, fetchDayTasks, patchTask } from 'redux/tasks/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from 'redux/tasks/selectors';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskToolBar = ({ id }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  let editTask = tasks.find(task => task._id === id);

  const category = ['to-do', 'in-progress', 'done'];

  const [showEditBtn, setShowEditBtn] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const handleClick = () => {
    setIsClicked(true);
  };

  const handleToggleModal = () => setIsOpened(!isOpened);

  async function handleOptionChange(event) {
    await setSelectedOption(event.target.value);
    editTask = { ...editTask, category: event.target.value };

    dispatch(patchTask({ id: id, task: { category: editTask.category } }));
    setIsClicked(false);
  }
  let { currentDay } = useParams();

  const onDeleteHendler = () => {
    dispatch(deleteTask(id));

    const date = new Date(currentDay);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const reqObj = {
      month,
      day,
      year,
      page: 1,
      limit: 100,
    };

    dispatch(fetchDayTasks(reqObj));
  };
  return (
    <Wraper>
      <BtnArrow>
        <BtnStyled
          type="button"
          onClick={() => {
            handleClick();
          }}
        >
          <ToolBarItem>
            <use href={`${Icons}#task-move-sf`}></use>
          </ToolBarItem>
        </BtnStyled>
        <ChouseCat
          style={isClicked ? { display: 'flex' } : { display: 'none' }}
        >
          {category.map(item => {
            return (
              item !== editTask.category && (
                <div key={Math.random()}>
                  <LabelStyled>
                    {item}
                    <ToolBarItem>
                      <use href={`${Icons}#task-move-sf`}></use>
                    </ToolBarItem>
                    <InputStyled
                      type="radio"
                      value={item}
                      checked={selectedOption === { item }}
                      onChange={handleOptionChange}
                    />
                  </LabelStyled>
                </div>
              )
            );
          })}
        </ChouseCat>
      </BtnArrow>

      <BtnStyled
        type="button"
        onClick={() => {
          handleToggleModal();
          setShowEditBtn(true);
        }}
      >
        <ToolBarItem>
          <use href={`${Icons}#task-edit-sf`}></use>
        </ToolBarItem>
      </BtnStyled>
      <BtnStyled type="button" onClick={() => onDeleteHendler(id)}>
        <ToolBarItem>
          <use href={`${Icons}#task-trash-sf`}></use>
        </ToolBarItem>
      </BtnStyled>
      {isOpened && (
        <TaskModal
          onCloseModal={handleToggleModal}
          showEditBtn={showEditBtn}
          id={id}
          category={editTask.category}
        />
      )}
    </Wraper>
  );
};
export default TaskToolBar;
