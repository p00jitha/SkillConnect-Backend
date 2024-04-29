import React, { useState, useEffect } from 'react';
import '../Home/Banner.css';
import Profile from './Profile'
import img3 from '../Images/img3.jpg';
import axios from 'axios';
import Header from '../Home/Header';

const Display = () => {
  const [usersWithSkills, setUsersWithSkills] = useState([]);
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/skill/skills', { params: { address: address } });
        setUsersWithSkills(response.data.usersWithSkills);
        console.log(usersWithSkills)
      } catch (error) {
        console.log(error)
        setError('Error fetching data');
      }
    };
    fetchData();
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Header/>
    <div style={{backgroundColor:"white"}}>
      {usersWithSkills.length > 0 ? (
        <div>
          {usersWithSkills.map((userData, index) => (
            <>
            <div key={index}>
              <Profile username={userData.user.username} 
              email={userData.user.email} 
              phoneno={userData.user.phoneno} 
              address={userData.user.address} 
              imgurl={`http://localhost:5000/Images/${userData.user.profilePic}`} 
              skills={userData.skills}/>
            </div>
            </>
          ))}
        </div>
      ) : (
        <div>
          <div style={{backgroundColor:"black"}}>
      <div className="static-slider9 position-relative">
  <div className="row">
    <div className="container" style={{margin:"20px"}}>
      <div className="col-md-5 info-detail align-self-center" >
        <h1 className="title">Unleash your potential and fuel your passion</h1>
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="form-group">
            </div>
            <input type="text" class="form-control form-control-lg mr-2 mb-2" id="address"
          name="address"
          value={address} onChange={handleAddressChange} placeholder="Enter Location" required></input>
          <button type="submit" className="btn btn-md btn-success-gradiant text-white border-0 mb-2">Search</button>
        </form>
      </div>
    </div>
    <div className="col-md-5 bg-img" style={{backgroundImage:`url(${img3})`,backgroundSize: 'cover', height: '70vh',width:"50%",margin:"30px"}}>
    </div>
  </div>
</div>
    </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Display;


{/* <form onSubmit={handleSubmit}>
<label htmlFor="address">Enter Address:</label>
<input
  type="text"
  id="address"
  name="address"
  value={address}
  onChange={handleAddressChange}
  placeholder="Enter address..."
  required
/>
<button type="submit">Search</button>
</form> */}

{/* <div key={index}>
<Profile user={userData.user.username} email={userData.user.email} phoneno={userData.user.phoneno} address={userData.user.address}/>
<h3>User: {userData.user.username}</h3>
<p>Email: {userData.user.email}</p>
<li>Phoneno:{userData.user.phoneno}</li>
<li>address:{userData.user.address}</li>
<img src={`http://localhost:5000/Images/${userData.user.profilePic}`} alt="profilepic"/>
<p>Skills:</p>
<ul>
  {userData.skills.map((skill, index) => (
    <>
    <li key={index}>{skill.skillName}</li>
    <p>Credentials Photo:</p>
    <img src={`http://localhost:5000/Skills/${skill.credentials}`} alt="Credentials" />
    </>
  ))}
</ul>
{userData.user.credentialsPhoto && (
  <div>
  </div>
)}
</div> */}

{/* <p>Skills:</p>
              <ul>
                {userData.skills.map((skill, index) => (
                  <>
                  <li key={index}>{skill.skillName}</li>
                  <p>Credentials Photo:</p>
                  <img src={`http://localhost:5000/Skills/${skill.credentials}`} alt="Credentials" />
                  </>
                ))}
              </ul> */}