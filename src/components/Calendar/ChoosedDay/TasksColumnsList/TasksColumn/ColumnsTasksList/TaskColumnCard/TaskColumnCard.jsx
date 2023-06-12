import { useState } from 'react';
import {
  Avatar,
  CardWraper,
  NoAvatar,
  PriorityWraper,
  TaskText,
  ToolsWraper,
  Wraper,
} from './TaskColumnCard.Styled';
import TaskToolBar from './TaskToolbar/TaskToolbar';
import { selectUser } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const TaskColumnCard = ({ taskText, priority, id, addCategory }) => {
  const user = useSelector(selectUser);

  const [isCut, setIsCut] = useState(true);
  const toggleCut = () => {
    setIsCut(!isCut);
  };
  const { t } = useTranslation();
  let styleObj = isCut
    ? { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }
    : { textOverflow: 'clip', whiteSpace: 'normal', overflow: 'visible' };
  return (
    <CardWraper>
      <TaskText
        onMouseEnter={toggleCut}
        onMouseLeave={toggleCut}
        style={styleObj}
      >
        {taskText}
      </TaskText>
      <Wraper>
        <ToolsWraper>
          {user.avatarURL ? (
            <Avatar src={user.avatarURL} alt="user avatar" />
          ) : (
            <NoAvatar>{user.name?.charAt(0).toUpperCase()}</NoAvatar>
          )}

          <PriorityWraper text={priority}>
            {priority === 'low' && t('Low')}
            {priority === 'medium' && t('Medium')}
            {priority === 'high' && t('High')}
          </PriorityWraper>
        </ToolsWraper>
        <TaskToolBar id={id} addCategory={addCategory} />
      </Wraper>
    </CardWraper>
  );
};
export default TaskColumnCard;
