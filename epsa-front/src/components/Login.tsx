import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'

//Login interface 
export default function Login() {

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md shadow-sm ">
      <LoginHeader />
      <LoginForm />
    </div>
  )
}