import './App.css'
// 1. List 컴포넌트 import
import List from './components/List'

function App() {
  const nickname = '우리'
  const sweetPotato = '고구마'
  const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']
  return (
     <>
      <strong className='school'>숙명여자대학교</strong>
      <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>{nickname}/김선화</p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
      <ul>
        {array.map((a, idx) => (
          // 2. <li key={idx}>{a}입니다.</li> List 컴포넌트 호출
          <List key={idx} tech={a} />
        ))}
      </ul>
     </>
  )
}

export default App
