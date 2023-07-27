import { useDispatch } from "react-redux"
import { content } from "../content";

export const Navbar:React.FC = () =>{
    const dispatch = useDispatch();
    return <section className="navbar">
        <nav className="navbar__item active showUp">
            <p>Work</p>
        </nav>
        <nav className="navbar__item showUp">
            <p onClick={()=>{
                dispatch({type:"ENABLE_SECTION",payload: content[Math.floor(Math.random() * 7)].id})
        }}>Skills</p>
        </nav>
    </section>
}