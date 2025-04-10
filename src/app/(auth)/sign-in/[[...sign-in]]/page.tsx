import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Login;
