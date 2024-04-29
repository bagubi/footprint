// const list = [{ id: 1001, name: 'vue' },
// { id: 1002, name: 'vue' }]




// function App() {
//   return (
//     <div className="App">
//       。。。
//       <ul>
//         {list.map(item => <li key={item.id}>{item.name}</li>)}
//       </ul>
//     </div>
//   );
// }

// export default App;
//打算在这里建个组件
function Button() {
  return <button>click me!</button>
}
function App() {
  return (
    <div className="App">
      <Button />
    </div>

  )
}