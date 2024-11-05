import React from "react";
import useStore from "../../store/store";

function Main() {
  const { count, incrementCount, removeCount, minusCount } = useStore(
    (state) => state
  );
  return (
    <div>
      <div>{count}</div>
      <button onClick={incrementCount}>증가</button>
      <button onClick={minusCount}>감소</button>
      <button onClick={removeCount}>초기화</button>
    </div>
  );
}

export default Main;
