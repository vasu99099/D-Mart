import twilio from "twilio";

async function sendSMSOTP(phoneNumber,res) {
  try {
    var accountSid = process.env.SMS_accountSid;
    var authToken = process.env.SMS_authToken;
    const client = twilio(accountSid, authToken);
    let OTP = generateOTP();
    // await client.messages.create({
    //   body: `${OTP} is the One Time Password (OTP) to log in to your DMart Ready account.Your OTP will expire in 2 minutes`,
    //   from: process.env.SMS_FROM,
    //   to: `+91${phoneNumber}`,
    // });

    return OTP;
  } catch (e) {
    throw new Error("OTP  sending failed");
  }
}

function generateOTP() {
  var string = "123456789";
  var len = string.length;
  let OTP = "";
  for (var i = 0; i < 4; i++) {
    OTP += string[Math.floor(Math.random() * len)];
  }
  console.log(OTP);
  return OTP;
}

export default sendSMSOTP;
