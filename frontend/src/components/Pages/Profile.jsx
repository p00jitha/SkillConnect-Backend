import React from 'react';
import './Profile.css'

const Profile = ({ username, email, phoneno, address, imgurl, skills }) => {
    console.log(skills[0].description)
    return (
        <div className="row py-5 px-4" id="a">
            <div className="col-md-5 mx-auto">
                {/* Profile widget */}
                <div className="bg-black shadow rounded overflow-hidden">
                    <div className="px-4 pt-0 pb-4 cover">
                        <div className="media align-items-end profile-head">
                            <div className="profile mr-3">
                                <div className="row">
                                    <div className="col-4">
                                        <img
                                            src={imgurl}
                                            alt="..."
                                            width="130"
                                            className="rounded mb-2 img-thumbnail"
                                        />
                                        {/*<a href="#" className="btn btn-outline-light btn-sm btn-block">Edit profile</a>*/}
                                    </div>
                                    <div className="col-8">
                                        <h4 style={{ fontFamily: "Edwardian Script", fontWeight: "bold" }}>{username}</h4>

                                        <p>Address: {address}</p>
                                        <p>Email:{email}</p>
                                        <p>Phone: {phoneno}</p>
                                        {skills.length > 0 && (
        <div>
            <h5>Skills:</h5>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>
                        <p>Skill Name: {skill.skillName}</p>
                        <p>Description: {skill.description}</p>
                        <div className="col-lg-6 mb-2 pr-lg-1">
                                    <img
                                        src={`http://localhost:5000/Skills/${skill.credentials}`}
                                        alt=""
                                        className="img-fluid rounded shadow-sm"
                                    />
                                </div>
                    </li>
                ))}
            </ul>
        </div>
    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-5 py-5" style={{ marginTop: "20px", boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)" }}>
                        {skills.map((skill, index) => {
                            <div key={index}>
                                <div className=" rounded shadow-sm bg-dark" style={{ marginTop: "20px", marginRight: "50px", padding: "20px" }} >
                                    <p className="font-italic mb-0" style={{color:"white"}}>{skill.skillName}</p>
                                </div>
                                <div className="py-4 px-4">
                            <div className="row">
                                <div className="col-lg-6 mb-2 pr-lg-1">
                                    <img
                                        src={`http://localhost:5000/Skills/${skill.credentials}`}
                                        alt=""
                                        className="img-fluid rounded shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                            </div>
                        })}
                    </div>
                </div>
                </div>
                </div>
            );
};

            export default Profile;