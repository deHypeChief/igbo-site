import '../../assets/styles/admin/adminAuth.css'
import { Button } from '../../components/button/button'
import { AdminLayout } from '../../components/layout/layout';
import logo from "../../assets/images/logo/learn_igbo_logo.svg"
import { useEffect, useState } from 'react';
import { adminSigned, authAdmin } from '../../utilis/authManger';
import { useNavigate } from 'react-router-dom';

export default function AdminAuth() {
  const navTo = useNavigate()
  const [formData, setFormData] = useState({
    adminID: "",
    pin: ""
  })

  useEffect(()=>{
    if(adminSigned()){
      navTo('/admin/dashboard')
    }
  })

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, like sending it to a server
    authAdmin('/admin/adminAuth', formData).then((data) => {
      if (data) {
        localStorage.setItem("admin", JSON.stringify(data.data))
        alert("Login Valid")
        navTo('/admin/dashboard')
      }
    }).catch((error) => {
      alert(error.response.data.message)
    })
  };

  return (
    <AdminLayout>
      <div className="authBox">
        <div className="adLogo">
          <img src={logo} alt="" />
        </div>
        <br />
        <h1>Welcome</h1>
        <p>Login to your account to continue</p>

        <form action="submit" onSubmit={handleSubmit}>
          <input type="text" placeholder='AdminID' className="adminInput"
            name="adminID"
            value={formData.adminId}
            onChange={handleInputChange} />
          <input type="password" placeholder="Pin" className="adminInput"
            name="pin"
            value={formData.pin}
            onChange={handleInputChange} />

          <div className="formButton">
            <Button admin>Login</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}