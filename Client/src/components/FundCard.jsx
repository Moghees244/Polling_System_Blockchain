// import React from 'react';

// import { tagType, thirdweb } from '../assets';
// import { daysLeft } from '../utils';

// const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
//   const remainingDays = daysLeft(deadline);
  
//   return (
//     <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
//       <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

//       <div className="flex flex-col p-4">
//         <div className="flex flex-row items-center mb-[18px]">
//           <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
//           <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
//         </div>

//         <div className="block">
//           <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
//           <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
//         </div>

//         <div className="flex justify-between flex-wrap mt-[15px] gap-2">
//           <div className="flex flex-col">
//             <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
//             <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Raised of {target}</p>
//           </div>
//           <div className="flex flex-col">
//             <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{remainingDays}</h4>
//             <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Days Left</p>
//           </div>
//         </div>

//         <div className="flex items-center mt-[20px] gap-[12px]">
//           <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
//             <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain"/>
//           </div>
//           <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FundCard

import React, { useState } from 'react';
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';

const FundCard = ({ pId,owner, title, description, target, deadline, amountCollected, image, question, options, handleClick,active,pollContract }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const remainingDays = daysLeft(deadline);

  const handleEndPoll =  async (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick event
  };

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />

      <div className="flex flex-col p-4">
        {/* <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain" />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
        </div> */}

     

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          {/* <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Total</p>
          </div> */}
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{active?"Active":"Ended"}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Status</p>
          </div>
        </div>
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
        </div>
        <div className="mt-[20px]">
        <div className="mt-[10px] flex flex-col gap-2">
              {options.map((option, index) => (
                <div key={index} className="font-epilogue font-normal text-[14px] text-[#808191] leading-[24px]">
                  <p>{option.option}: {option.votes} votes</p>
                </div>
              ))}
              <button className="mt-[10px] bg-[#8c6dfd] text-white py-1 px-3 rounded" onClick={handleEndPoll}>
                End Poll
              </button>
            </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard;


// import React, { useState } from 'react';
// import { tagType, thirdweb } from '../assets';
// import { daysLeft } from '../utils';

// const FundCard = ({ pId, owner, title, description, target, deadline, amountCollected, image, question, options, handleClick, active, isAdmin }) => {
//   const remainingDays = daysLeft(deadline);

//   const handleEndPoll = async (e) => {
//     e.stopPropagation(); // Prevent triggering the card's onClick event
//     // Add end poll logic here if needed
//   };

//   return (
//     <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
//       <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />

//       <div className="flex flex-col p-4">
//         <div className="flex justify-between flex-wrap mt-[15px] gap-2">
//           <div className="flex flex-col">
//             <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{active ? "Active" : "Ended"}</h4>
//             <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Status</p>
//           </div>
//         </div>
//         <div className="block">
//           <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
//         </div>
//         <div className="mt-[20px]">
//           {isAdmin ? (
//             <div className="mt-[10px] flex flex-col gap-2">
//               {options.map((option, index) => (
//                 <div key={index} className="font-epilogue font-normal text-[14px] text-[#808191] leading-[24px]">
//                   <p>{option.option}: {option.votes} votes</p>
//                 </div>
//               ))}
//               <button 
//                 className="mt-[10px] bg-[#8c6dfd] text-white py-1 px-3 rounded"
//                 onClick={handleEndPoll}
//               >
//                 End Poll
//               </button>
//             </div>
//           ) : (
//             <div>
//               <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{question}</p>
//               <div className="mt-[10px] flex flex-col gap-2">
//                 {options.map((option, index) => (
//                   <label key={index} className="font-epilogue font-normal text-[14px] text-[#808191] leading-[24px]">
//                     <input
//                       type="radio"
//                       name={`poll-${title}`}
//                       value={option.option}
//                       onChange={(e) => setSelectedOption(e.target.value)}
//                       className="mr-2"
//                     />
//                     {option.option}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center mt-[20px] gap-[12px]">
//           <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
//             <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
//           </div>
//           <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FundCard;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { thirdweb } from '../assets';
// import { daysLeft } from '../utils';

// const FundCard = ({ pId, owner, title, description, target, deadline, amountCollected, image, question, options, handleClick, active, isAdmin }) => {
//   const navigate = useNavigate();
//   const remainingDays = daysLeft(deadline);


//     const handleEndPoll = async (e) => {
//     e.stopPropagation(); // Prevent triggering the card's onClick event
//     // Add end poll logic here if needed
//   };
//   const handleCardClick = () => {
//     navigate(`/campaign/${pId}`, { state: { pId, owner, title, description, target, deadline, amountCollected, image, question, options, active } });
//   };

//   return (
//     <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleCardClick}>
//       <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />
//       <div className="flex flex-col p-4">
//         <div className="flex justify-between flex-wrap mt-[15px] gap-2">
//           <div className="flex flex-col">
//             <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{active ? "Active" : "Ended"}</h4>
//             <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Status</p>
//           </div>
//         </div>
//         <div className="block">
//           <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
//         </div>
//         <div className="mt-[20px]">
//         <div className="mt-[10px] flex flex-col gap-2">
//               {options.map((option, index) => (
//                 <div key={index} className="font-epilogue font-normal text-[14px] text-[#808191] leading-[24px]">
//                   <p>{option.option}: {option.votes} votes</p>
//                 </div>
//               ))}
//               <button className="mt-[10px] bg-[#8c6dfd] text-white py-1 px-3 rounded" onClick={handleEndPoll}>
//                 End Poll
//               </button>
//             </div>
//         </div>
//         <div className="flex items-center mt-[20px] gap-[12px]">
//           <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
//             <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
//           </div>
//           <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FundCard;
