function App() {
  const [userGreeting, setUserGreeting] = useState("初めまして");

  return (
    <div>
      <button onClick={() => setUserGreeting("おかえりなさい！")}>
        ユーザーを更新
      </button>
      <Greeting message={userGreeting} />
    </div>
  );
}

function Greeting(props) {
  return <h1>{props.message}</h1>;
}
