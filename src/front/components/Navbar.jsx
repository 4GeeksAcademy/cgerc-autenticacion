import { Link } from "react-router-dom";
import { Context } from "../store/appContext;"


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!store.token ?
						<Link to="/login">
							<button className="btn btn-primary">Check the Context in action</button>
						</Link>
						:
						<Link to="/logout">
							<button className="btn btn-primary">Log out</button>
						</Link>
				
				</div>
		</nav>
	);
};