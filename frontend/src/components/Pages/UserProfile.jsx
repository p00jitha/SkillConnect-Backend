import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './styles/Profile.css'
const UserProfile = () => {
  const [skill, setSkill] = useState([]);
  const [profile,setProfile] = useState([]);
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/profile/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      const { usersWithSkills } = data;
        const [{ skills }] = usersWithSkills;
        const [{users}] = usersWithSkills
        setSkill(skills || [])
        setProfile(users || [])
    });
  }, []);
  console.log(skill)
  return (
    <div>
      <div className="row py-5 px-4">
      <div className="col-md-5 mx-auto">
        <div className="bg-#074173 shadow rounded overflow-hidden" id="a">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="media align-items-end profile-head">
              <div className="profile mr-3">
                <div className="row">
                  <div className="col-4">
                    <img
                      src={`http://localhost:5000/Images/${profile.profilePic}`} 
                      alt="..."
                      width="130"
                      className="rounded mb-2 img-thumbnail"
                    />
                  </div>
                  <div className="col-8">
                  <h4 style={{fontFamily:"Edwardian Script",fontWeight:"bold"}}>{profile.username}</h4>
                  
                    <p>Address: {profile.address}</p>
                    <p>Email:{profile.email}</p>
                    <p>Phone: {profile.phoneno}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
          <div className="px-5 py-5" style={{marginTop:"20px",boxShadow:"5px 5px 10px #0c243b"}}>
            <div className=" rounded shadow-sm bg-#0c243b" style={{marginTop:"20px",marginRight:"50px",padding:"20px"}} >
            <h5 className="mb-0">Skills:</h5>
            {skill.map(skills => (
              <>
                    <p key={skills._id}>{skills.skillName}:</p>
              </>
            ))}
            </div>
          </div>
          <div className="py-4 px-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">CREDENTIALS:</h5>
            </div>
            <div className="row">
            {skill.map(skills => (
                       <div className="col-lg-6 mb-2 pl-lg-1" key={skills._id}>
                       <img
                         src={`http://localhost:5000/Skills/${skills.credentials}`}
                         alt=""
                         className="img-fluid rounded shadow-sm"
                       />
                     </div>
            ))}
              {/* <div className="col-lg-6 pr-lg-1 mb-2">
                <img
                  src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  alt=""
                  className="img-fluid rounded shadow-sm"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserProfile
