import React, { useContext } from "react";

import AuthContext from "../../context/AuthProvider";

import StatusNetwork from "../StatusNetwork";

import useCheckServerConnection from "../../hooks/useCheckServerConnection";

import { fioFormat } from "../../utils/formatField";

function Footer() {
  const { authenticatedUser } = useContext(AuthContext);
  const isOnline = useCheckServerConnection();

  return (
    <div className='footer'>
      <StatusNetwork isOnline={isOnline} />

      <div className='account'>
        <span className='account__name'>
          {authenticatedUser.supervisorid ? "сотрудник" : "руководитель"}
        </span>
        &ensp;
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
