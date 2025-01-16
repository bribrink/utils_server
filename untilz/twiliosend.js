module.exports = async function(username,email){
  try {
    let data = JSON.stringify({
      "from": `+16024973822`,
      "to": "+16025026839",
      "text": `${username} with email ${email} has registered an account`,
      "tags": ["PC_Reg"]
    })
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.TELNYXKEY}`
      },
      body: data
    }
    let resp = await fetch("https://api.telnyx.com/v2/messages", options);
    let r2 = await resp.json();
    console.log('RS', r2)
  }catch(e){
    console.log(e)
  }
}