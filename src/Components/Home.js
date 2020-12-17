import { useHistory } from "react-router-dom";

function Home() {
    var history = useHistory();
    console.log("Hello");
    history.push('/Login');
    return null;
}




export default Home