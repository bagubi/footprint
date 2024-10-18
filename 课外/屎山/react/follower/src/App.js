const list = [
  { id: 1001, name: "vue" },
  { id: 1002, name: "react" }, // 添加另一个对象元素
  { id: 1003, name: "angular" }, // 添加更多对象元素，以此类推
];

function App() {
  return (
    <div className="App">
      。。。
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

//打算在这里建个组件
function Button() {
  return <button>click me!</button>;
}
function App() {
  return (
    <div className="App">
      <Button />
    </div>
  );
}
// useState使用
import { useState } from "react";
function App() {
  //const是状态变量
  //setCount是状态变量的更新函数
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  const handleClick2 = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <button onClick={handleClick}>{count}</button>
      <button onClick={handleClick2}>修改form{form.name}</button>
    </div>
  );
}

export default App;
