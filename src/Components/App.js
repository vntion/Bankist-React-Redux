import Logo from './Logo';
import Main from './Main';
import NavForm from './NavForm';
import WelcomeMsg from './WelcomeMsg';

export default function App() {
  return (
    <>
      <nav>
        <WelcomeMsg />
        <Logo />
        <NavForm />
      </nav>

      <Main />
    </>
  );
}
