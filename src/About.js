import { useNavigate } from "react-router-dom"

const About=()=>{
    const navigate = useNavigate()
    const redirect=()=>{
        navigate("/admin",{replace:true})
    }

    return(
        <button onClick={()=>{redirect()}}>redirect</button>
    )
}

export default About