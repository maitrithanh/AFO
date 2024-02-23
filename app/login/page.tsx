import Languages from "../components/shared/Languages";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute top-0 z-50 m-2 text-white">
          <Languages />
        </div>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
