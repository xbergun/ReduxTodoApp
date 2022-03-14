//? CSS
//? Components
import Content from 'components/Content/Content';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';


function App() {
  return (
    <>
    <section className="todoapp">
      <Header/>
      <Content/>
    </section>
    <Footer/>
    </>
  );
}

export default App;
