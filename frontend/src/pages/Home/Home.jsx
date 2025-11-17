import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
        setLoading(false);
      });
  }, []);

  const handleUserClick = (user) => {
    navigate("/professional", { state: { user } });
  };

  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <Card
                key={user.id}
                title={user.name}
                description={`Email: ${user.email}\nTelefone: ${user.phone}\n`}
                price={`R$ ${Math.floor(Math.random() * 100 + 50)},00`}
                imageSrc={`https://i.pravatar.cc/150?img=${user.id}`}
                buttonText="Ver Detalhes"
                onButtonClick={() => handleUserClick(user)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
