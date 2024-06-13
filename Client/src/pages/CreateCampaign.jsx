import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import PollContractAbi from "../../contracts/abi.json";
import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import axios from "axios"

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    question: '',
    numberOfOptions: 0,
    options: [],
    duration: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  }

  const handleOptionsChange = (index, e) => {
    const newOptions = [...form.options];
    newOptions[index] = e.target.value;
    setForm({ ...form, options: newOptions });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in here");
    console.log(`form = ${JSON.stringify(form)}`);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const pollContract = new ethers.Contract("0x43f148C0e8D5233DE8B44EAdF9840b39fA1cED71",PollContractAbi,provider) 
    const signer = provider.getSigner(); // Ensure to get the signer for read and write operations 
    const pollContract = new ethers.Contract("0x7E141fD5308B885533351bf6d817839d61Ed2DB7", PollContractAbi, signer);

    try {
      const pollCount = await pollContract.pollCount();
      console.log(`pollCount = ${pollCount.toString()}`); 
    } catch (error) {
      console.error("Error retrieving pollCount:", error);
    }

    try {
      // Ensure the signer is the admin (contract owner)
      const ownerAddress = "0x096281e7129c467E19EE957a223C119d7077F660"; 
      const signerAddress = await signer.getAddress();

      if (signerAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
        console.error("Signer is not the contract owner");
        return;
      }

      // Call createPoll function
      const tx = await pollContract.createPoll(form.question, form.options);
      await tx.wait(); // Wait for the transaction to be minedp

      console.log("Poll created successfully", tx);

      // Get the latest poll ID (since pollCount is incremented after creation)
      const pollId = (await pollContract.pollCount()) - 1;

      // Fetch poll details
      const poll = await pollContract.viewPoll(pollId);

      console.log("Poll Details:", {
        question: poll[0],
        options: poll[1],
        active: poll[2]
      });

      navigate('/');
    } catch (error) {
      console.error("Error creating poll:", error);
    }
    // await createCampaign({ ...form });
    // setIsLoading(false);
    // navigate('/');
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create Poll</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Poll Question *"
            placeholder="Write your question"
            inputType="text"
            value={form.question}
            handleChange={(e) => handleFormFieldChange('question', e)}
          />
        </div>

        <FormField 
          labelName="Number of Options *"
          placeholder="3"
          inputType="number"
          value={form.numberOfOptions}
          handleChange={(e) => handleFormFieldChange('numberOfOptions', e)}
        />

        {Array.from({ length: form.numberOfOptions }, (_, index) => (
          <FormField 
            key={index}
            labelName={`Option ${index + 1} *`}
            placeholder={`Option ${index + 1}`}
            inputType="text"
            value={form.options[index] || ''}
            handleChange={(e) => handleOptionsChange(index, e)}
          />
        ))}

        <FormField 
          labelName="Poll Duration (days) *"
          placeholder="15"
          inputType="number"
          value={form.duration}
          handleChange={(e) => handleFormFieldChange('duration', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton 
            btnType="submit"
            title="Create Poll"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign
