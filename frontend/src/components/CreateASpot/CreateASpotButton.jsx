import { useState } from "react";
import CreateASpot from './CreateASpot';
import './CreateASpot.css';

function CreateASpotButton(){
  const [isModalOpen, setIsModalOpen] = useState(false); // 用于控制模态框是否显示
  const openModal = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };
  return (
    <div>
      <button 
       className="createManageAspotbutton"
      onClick={openModal}>Create a New Spot</button> {/* 点击按钮打开登录框 */}
      <CreateASpot 
      isOpen={isModalOpen} onClose={closeModal} /> 
    </div>

  );
}
export default CreateASpotButton;