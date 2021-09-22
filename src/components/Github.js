import React, { useState } from 'react'
import Swal from 'sweetalert2'
import "./github.scss"

export default function Github() {
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [repos, setRepos] = useState([]);

    const handleSearch = (e) => {
        setUser(e.target.value)
    }
    const handleSubmit = () => {
        fetch(`https://api.github.com/users/` + user)
          .then(res => res.json())
          .then(data => {
            if (data.message) {
                setError(data.message)
            } else {
                setData(data)
                setError(null)
            }
        })

        fetch(`https://api.github.com/users/` + user + `/repos`)
          .then(res => res.json())
          .then(repos => {
            if(repos.message) {
                setError(repos.message)
            } else {
                setRepos(repos)
                setError(null)
            }
        })
    }

    return (
        <div className="body">
            <div className="title">
                <h1>GITHUB API</h1>
            </div>

            <div className="search">
                    <input className='input' type="text" placeholder="Search for a profile" value={user}
                    onChange={handleSearch}/>
                <button onClick={handleSubmit} className="buttonSearch">Search</button>
            </div>
            
            {error ? (<h1 className="error">{error}</h1>) : (
            <div className="card" show={this.state.card}> 
                <div className="user">
                    <img className="avatar" src={ `${data?.avatar_url}` } alt=""></img>
                    <p>User: {data?.login}</p>
                    <p>Bio: {data?.bio}</p>
                    <p>Followers: {data?.followers}</p>
                    <p>Followings: {data?.following}</p>
                    <p>Email: {data?.email}</p>
                </div>

                    {repos.sort((a, b) => b.stargazers_count - a.stargazers_count).map((repo) => {
                        return (
                            <div className="repositories"> 
                                <li className="repository" key={repo.id} onClick={() => Swal.fire({
                                    title: `${repo.name}`,
                                    html: `Description: ${repo.description} <br> Stars: ${repo.stargazers_count} <br> Languages: ${repo.language} <br> Link: <a href="${repo.html_url}">Repository</a>`,
                                    toast: true,
                                })}>
                                    {repo.name} - ⭐ {repo.stargazers_count}
                                </li>
                            </div>
                        )
                    })}
             </div>
             )}
        </div>
    )
}
