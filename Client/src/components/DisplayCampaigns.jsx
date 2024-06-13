


// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { v4 as uuidv4 } from "uuid";
// // import FundCard from './FundCard';
// // import { loader } from '../assets';

// // const defaultCampaigns = [
// //   {
// //     pId: '1',
// //     title: 'Default Campaign 1',
// //     image: 'https://via.placeholder.com/600x400',
// //     target: '10 ETH',
// //     amountCollected: '2 ETH',
// //     deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
// //     owner: '0x1234567890abcdef1234567890abcdef12345678',
// //     description: 'This is the first default campaign for demonstration purposes.'
// //   },
// //   {
// //     pId: '2',
// //     title: 'Default Campaign 2',
// //     image: 'https://via.placeholder.com/600x400',
// //     target: '15 ETH',
// //     amountCollected: '3 ETH',
// //     deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
// //     owner: '0xabcdef1234567890abcdef1234567890abcdef12',
// //     description: 'This is the second default campaign for demonstration purposes.'
// //   },
// //   {
// //     pId: '3',
// //     title: 'Default Campaign 3',
// //     image: 'https://via.placeholder.com/600x400',
// //     target: '20 ETH',
// //     amountCollected: '5 ETH',
// //     deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
// //     owner: '0x7890abcdef1234567890abcdef1234567890abcd',
// //     description: 'This is the third default campaign for demonstration purposes.'
// //   }
// // ];

// // const DisplayCampaigns = ({ title, isLoading, campaigns = defaultCampaigns }) => {
// //   const navigate = useNavigate();

// //   const handleNavigate = (campaign) => {
// //     navigate(`/campaign-details/${campaign.title}`, { state: campaign });
// //   }

// //   const displayCampaigns = campaigns.length > 0 ? campaigns : defaultCampaigns;

// //   return (
// //     <div>
// //       <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({displayCampaigns.length})</h1>

// //       <div className="flex flex-wrap mt-[20px] gap-[26px]">
// //         {isLoading && (
// //           <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
// //         )}

// //         {!isLoading && displayCampaigns.map((campaign) => (
// //           <FundCard 
// //             key={uuidv4()}
// //             {...campaign}
// //             handleClick={() => handleNavigate(campaign)}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default DisplayCampaigns;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from "uuid";
// import FundCard from './FundCard';
// import { loader } from '../assets';

// const defaultCampaigns = [
//   {
//     pId: '1',
//     title: 'Default Campaign 1',
//     image: 'https://via.placeholder.com/600x400',
//     target: '10 ETH',
//     amountCollected: '2 ETH',
//     question: 'Will Ai replace software developers?',
//     options: ["Yes", "No"],
//     deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
//     owner: '0x1234567890abcdef1234567890abcdef12345678',
//     description: 'This is the first default campaign for demonstration purposes.'
//   },
//   {
//     pId: '2',
//     title: 'Default Campaign 2',
//     image: 'https://via.placeholder.com/600x400',
//     target: '15 ETH',
//     amountCollected: '3 ETH',
//     question: 'Will Ai replace software developers?',
//     options: ["Yes", "No","Not Possible"],
//     deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
//     owner: '0xabcdef1234567890abcdef1234567890abcdef12',
//     description: 'This is the second default campaign for demonstration purposes.'
//   }
// ];

// const DisplayCampaigns = ({ title, isLoading, campaigns = defaultCampaigns }) => {
//   const navigate = useNavigate();

//   const handleNavigate = (campaign) => {
//     navigate(`/campaign-details/${campaign.title}`, { state: campaign });
//   }

//   const displayCampaigns = campaigns.length > 0 ? campaigns : defaultCampaigns;

//   return (
//     <div>
//       <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({displayCampaigns.length})</h1>

//       <div className="flex flex-wrap mt-[20px] gap-[26px]">
//         {isLoading && (
//           <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
//         )}

//         {!isLoading && displayCampaigns.map((campaign) => (
//           <FundCard 
//             key={uuidv4()}
//             {...campaign}
//             handleClick={() => handleNavigate(campaign)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DisplayCampaigns;



// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from "uuid";
// import FundCard from './FundCard';
// import PollContractAbi from "../../contracts/abi.json";
// import { loader } from '../assets';
// import { ethers } from 'ethers';

// // const defaultCampaigns = [
// //   {
// //     pId: '1',
// //     title: 'Default Campaign 1',
// //     image: 'https://via.placeholder.com/600x400',
// //     target: '10 ETH',
// //     amountCollected: '2 ETH',
// //     question: 'Will AI replace software developers?',
// //     options: ["Yes", "No"],
// //     deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
// //     owner: '0x1234567890abcdef1234567890abcdef12345678',
// //     description: 'This is the first default campaign for demonstration purposes.'
// //   },
// //   {
// //     pId: '2',
// //     title: 'Default Campaign 2',
// //     image: 'https://via.placeholder.com/600x400',
// //     target: '15 ETH',
// //     amountCollected: '3 ETH',
// //     question: 'Will AI replace software developers?',
// //     options: ["Yes", "No", "Not Possible"],
// //     deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
// //     owner: '0xabcdef1234567890abcdef1234567890abcdef12',
// //     description: 'This is the second default campaign for demonstration purposes.'
// //   }
// // ];

// const DisplayCampaigns = ({ title, isLoading, campaigns = defaultCampaigns }) => {
//   const navigate = useNavigate();
//   const [defaultCampaigns, setdefaultCampaigns] = React.useState([]);

//   useEffect(()=>{
//     var arr=[]
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const signer = provider.getSigner(); // Ensure to get the signer for read and write operations 
//     const pollContract = new ethers.Contract("0x7E141fD5308B885533351bf6d817839d61Ed2DB7", PollContractAbi, signer);
//     const pollCount =  pollContract.pollCount();
//     for(let i=0;i<pollCount-1;i++){
//       const poll =  pollContract.viewPoll(i);
//       arr.push({
//         pId:i,
//         image: 'https://via.placeholder.com/600x400',
//         owner: '0x096281e7129c467E19EE957a223C119d7077F660',
//         target: '15 ETH',
//         amountCollected: '3 ETH',
//         deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
//         description: 'This is the second default campaign for demonstration purposes.',
//         title: poll[0],
//         options: poll[1],
//         active: poll[2],
//       })
//       console.log("Effect = ",arr);
//     }
//     setdefaultCampaigns(arr);
//   },[])
//   const handleNavigate = (campaign) => {
//     navigate(`/campaign-details/${campaign.title}`, { state: campaign });
//   }

//   const displayCampaigns = campaigns.length > 0 ? campaigns : defaultCampaigns;

//   return (
//     <div>
//       <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({displayCampaigns.length})</h1>

//       <div className="flex flex-wrap mt-[20px] gap-[26px]">
//         {isLoading && (
//           <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
//         )}

//         {!isLoading && displayCampaigns.map((campaign) => (
//           <FundCard 
//             key={uuidv4()}
//             {...campaign}
//             handleClick={() => handleNavigate(campaign)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DisplayCampaigns;


// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from "uuid";
// import FundCard from './FundCard';
// import PollContractAbi from "../../contracts/abi.json";
// import { loader } from '../assets';
// import { ethers } from 'ethers';

// const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
//   const navigate = useNavigate();
//   const [defaultCampaigns, setdefaultCampaigns] = React.useState([]);
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const [pollContract, setPollContract] = React.useState(new ethers.Contract("0x7E141fD5308B885533351bf6d817839d61Ed2DB7", PollContractAbi, signer));
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
        
//         // const pollContract = new ethers.Contract("0x7E141fD5308B885533351bf6d817839d61Ed2DB7", PollContractAbi, signer);
        
//         const pollCount = await pollContract.pollCount();
//         const polls = [];

//         for (let i = 0; i < pollCount; i++) {
//           const poll = await pollContract.viewPoll(i);
//           polls.push({
//             pId: i,
//             image: 'https://via.placeholder.com/600x400',
//             owner: '0x096281e7129c467E19EE957a223C119d7077F660',
//             target: '15 ETH',
//             amountCollected: '3 ETH',
//             deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
//             description: 'This is the second default campaign for demonstration purposes.',
//             title: poll[0],
//             options: poll[1],
//             active: poll[2],
//           });
//         }
//         setdefaultCampaigns(polls);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleNavigate = (campaign) => {
//     navigate(`/campaign-details/${campaign.title}`, { state: campaign, contract:pollContract });
//   }

//   const displayCampaigns = campaigns && campaigns.length > 0 ? campaigns : defaultCampaigns;

//   return (
//     <div>
//       <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({displayCampaigns.length})</h1>

//       <div className="flex flex-wrap mt-[20px] gap-[26px]">
//         {isLoading && (
//           <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
//         )}

//         {!isLoading && displayCampaigns.map((campaign) => (
//           <FundCard 
//             key={uuidv4()}
//             {...campaign}
//             handleClick={() => handleNavigate(campaign,pollContract)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DisplayCampaigns;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import PollContractAbi from "../../contracts/abi.json";
import { loader } from '../assets';
import { ethers } from 'ethers';

const DisplayCampaigns = ({ title, isLoading, campaigns, isAdmin }) => {
  const navigate = useNavigate();
  const [defaultCampaigns, setdefaultCampaigns] = React.useState([]);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const [pollContract, setPollContract] = React.useState(new ethers.Contract("0x7E141fD5308B885533351bf6d817839d61Ed2DB7", PollContractAbi, signer));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pollCount = await pollContract.pollCount();
        const polls = [];

        for (let i = 0; i < pollCount; i++) {
          const poll = await pollContract.viewPoll(i);
          const results = await pollContract.getResults(i);
          const formattedResults = results.map((result, index) => ({
            option: poll[1][index],
            votes: result.toNumber(),
          }));

          polls.push({
            pId: i,
            image: 'https://via.placeholder.com/600x400',
            owner: '0x096281e7129c467E19EE957a223C119d7077F660',
            target: '15 ETH',
            amountCollected: '3 ETH',
            deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'This is the second default campaign for demonstration purposes.',
            title: poll[0],
            options: formattedResults,
            active: poll[2],
          });
        }
        setdefaultCampaigns(polls);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign, contract:pollContract });
  }

  const displayCampaigns = campaigns && campaigns.length > 0 ? campaigns : defaultCampaigns;

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({displayCampaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && displayCampaigns.map((campaign) => (
          <FundCard 
            key={uuidv4()}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}

export default DisplayCampaigns;
