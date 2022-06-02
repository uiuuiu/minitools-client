import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { NotificationData } from "../../types/data/NotificationData";
import CountingCirle from "../commons/CountingCircle";
import "./UserBoard.scss";

const UserBoard = () => {
  const { notifications }: { notifications: NotificationData[] } = useSelector((state: RootState) => state.actions.common);

  return (
    <div className="header-user-board">
      <div className="user-board-item">
        <span>Notification</span> <CountingCirle value={notifications.length} />
      </div>
    </div>
  )
}

export default UserBoard;
