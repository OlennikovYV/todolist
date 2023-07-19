function StatusNetwork({ isOnline }) {
  return (
    <div className='network'>
      {`Статус сети: `}
      <span className={isOnline ? "online" : "offline"}>
        {isOnline ? "сервер доступен" : "сервер не доступен"}
      </span>
    </div>
  );
}

export default StatusNetwork;
