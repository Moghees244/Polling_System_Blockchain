// require('dotenv').config();
// const IP_ADDRESS = process.env.IP_ADDRESS;

const IP_ADDRESS = '10.54.3.81';
const URL=`http://${IP_ADDRESS}:3000`

export const signIn = async (email, password) =>{
    console.log(URL)
    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    const data = await response.json()
    return data
}

export const signUpp = async (email, password, name) =>{
    const response = await fetch(`${URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    const data = await response.json()
    return data

}

export const viewPolls = async (token) =>{

    const response = await fetch(`${URL}/viewPolls`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const vote = async (token, pollId, option) =>{
    const response = await fetch(`${URL}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            pollId: pollId,
            option: option
        })
    })
    const data = await response.json()
    return data
}