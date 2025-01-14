
import { useNavigate } from "react-router-dom";
import './CreateASpot.css';

function CreateASpotPageButton(){

    const navigate = useNavigate();
    const handlenavigate=()=>{
        navigate('/spots/new');
    }
 
  return (
    <div>
      <button onClick={handlenavigate} className='CreateASpotPageButton'>Create a New Spot</button> {/* 点击按钮打开登录框 */}
    </div>

  );
}
export default CreateASpotPageButton;