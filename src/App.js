import './App.css';
import { useState, useMemo } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);

  const isLimit = useMemo(() => {
    return todoList.length >= 8;
  }, [todoList]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!isLimit) {
      setTodoList((current) => {
        return [...current, {
          value: inputValue,
          isCompleted: false,
        }]
      });
      setInputValue('');
    }
  }

  const handleCompletedClick = (index) => {
    setTodoList((current) => {
      const newList = [...current];
      newList[index] = { ...newList[index], isCompleted: !newList[index].isCompleted };
      return newList;
    })
  }

  const handleRemoveClick = (index) => {
    setTodoList((current) => {
      const newList = [...current];
      newList.splice(index, 1);
      return newList;
    })
  }



  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2>디자인 몰?루</h2>
        <input 
        type='text' 
        value={inputValue} 
        onChange={e => setInputValue(e.target.value)}
        disabled={isLimit} />
        <button type='submit'>등록</button>
      </form>

      <ol>
        {todoList.map((item, index) => (
          <li className={item.isCompleted === true ? 'completed' : ''}>
            <span>{item.value}</span>
            <button onClick={() => { handleCompletedClick(index) }}>완료</button>
            <button onClick={() => { handleRemoveClick(index) }}>삭제</button>
          </li>
        ))}
      </ol>

      {isLimit && (
        <>
        <div>할 일 너무 많음</div>
        </>
      )}
    </div>
  );
}

export default App;
