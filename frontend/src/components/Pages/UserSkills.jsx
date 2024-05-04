import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './styles/UserSkill.css'
const UserSkills = () => {
  const navigate = useNavigate();
    const [skill, setSkill] = useState([]);
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/skill/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
        const { usersWithSkills } = data;
        const [{ skills }] = usersWithSkills;
        setSkill(skills || [])
    });
  }, []);
  const handleEdit = () => {
    navigate(`/myskills/${id}`);
  };
  const deleteRequest = async (skillid) => {
    const res = await axios
      .delete(`http://localhost:5000/api/skill/${id}/${skillid}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = (skillid) => {
      deleteRequest(skillid)
      .then(() => navigate("/myskills"));
  };
  return (
    <>
    <div>
{skill.map(skills => (
  <div className='userskills' key={skills._id}>
  <div className="card dark" id="card">
<img src={`http://localhost:5000/Skills/${skills.credentials}`} className="card-img-top" id="card-img" alt="..."/>
<div className="card-body">
    <div className="text-section">
        <h5 className="card-title fw-bold">{skills.skillName}</h5>
        <p className="card-text">{skills.description}</p>
    </div>
    <div>
    <div className="cta-section">
        {/* <a href="#" className="btn btn-light" onClick={handleEdit} >Update</a> */}
        <a href="#" className="btn btn-light" onClick={() => handleDelete(skills._id)}>Delete</a>
    </div>
    </div>
</div>
</div>
</div>
))}
</div>
    </>
  )
}

export default UserSkills

{/* <div>
{skill.map(skills => (
  <p key={skills._id}>{skills.description}</p>
))}
</div> */}
