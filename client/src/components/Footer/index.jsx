import React, { useContext } from "react";

import GlobalContext from "../../context/GlobalProvider";

import StatusNetwork from "../StatusNetwork";

import useCheckServerConnection from "../../hooks/useCheckServerConnection";

import { fioFormat } from "../../utils/formatField";

function Footer() {
  const { authenticatedUser, countAllTask, taskList } =
    useContext(GlobalContext);

  const isOnline = useCheckServerConnection();

  return (
    <div className='footer'>
      <StatusNetwork isOnline={isOnline} />

      <div className='count-task'>
        <span>{`Всего задач: ${countAllTask}`}</span>
      </div>

      <div className='account'>
        <span className='account__name'>
          {authenticatedUser.supervisorid ? "сотрудник" : "руководитель"}
        </span>
        <span className='account__name'>
          {fioFormat(
            authenticatedUser.lastname,
            authenticatedUser.firstname,
            authenticatedUser.fathername
          )}
        </span>
      </div>
    </div>
  );
}

export default Footer;
