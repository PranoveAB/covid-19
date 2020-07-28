const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('USSD Service to promote COVID-19 Awareness')
})


var http = require('http');
var data = '';
var options = {
    host: 'flask-pranu.herokuapp.com',
    path: '/'
}
var request = http.request(options, function (res) {
    
    res.on('data', function (chunk) {
        data += chunk;
    });        
});
request.end();

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    let response = `CON Awareness on CoronaVirus 
    COVID-19
    1. COVID-19 Symptoms
    2. How to wash hands? (By W.H.O)
    3. COVID-19 India Stats (By Worldometers.info)
    4. Helpline Phone Numbers

    Reply with your choice.`
    res.send(response)
  } else if (text == '1') {
    // Business logic for first level response
    let response = `END Common symptoms include:
    • Fever
    • Tiredness
    • Dry cough

    Other symptoms include:
    • Nausea or a runny nose
    • Aches and pains
    • Sore throat
    • Difficulty breathing (severe cases)

    Please call the helpline number (104) if you're experiencing any of the above symptoms.
    `
    res.send(response)
  } else if (text == '2') {
    // Business logic for first level response
    let response = `END Steps to wash hands:
    • Wet hands with water, apply enough soap to cover all hand surfaces.
    • Right palm over left dorsum with interlaced fingers and vice versa.
    • Palm to palm with fingers interlaced, backs of fingers to opposing palms with fingers interlocked
    • Rotational rubbing of left thumb in right palm and vice versa.
    • Rinse hands with water.
    • Dry hands thoroughly with a single use towel. Your hands are now safe.
    • Your hands are now safe. 😊`
    
    res.send(response)
  } else if (text == '3') {
    data = data.replace("(","")
    data = data.replace(")","")
    for(var i = 0;i<10;i++){
      data = data.replace("'","")
    }
    var result = data.split(",")

    let totalCases = result[0]
    let newCases = result[1]
    let totalDeaths = result[2]
    let newDeaths = result[3]
    let totalRecovered = result[4]

    let response = `END COVID-19 India Stats:
    
    Total Cases\t : ${totalCases}
    New Cases Today\t : ${newCases}
    Total Deaths\t : ${totalDeaths}
    New Deaths Today\t : ${newDeaths}
    Total Recovered\t : ${totalRecovered}
    `
    res.send(response)
  } /*else if (text == '1*1') {
    // Business logic for first level response
    let accountNumber = 'ACC1001'
    // This is a terminal request. Note how we start the response with END
    let response = `END Your account number is ${accountNumber}`
    res.send(response)
  } */else if (text == '4') {
    
    let response = `END  Helpline Numbers:
    • India Wide : +91-11-23978046
    • Karnataka   : 104 
    • Ambulance  : 108 
    `
    res.send(response)
  } /*else if (text == '1*2') {
    // This is a second level response where the user selected 1 in the first instance
    let balance = 'NGN 10,000'
    // This is a terminal request. Note how we start the response with END
    let response = `END Your balance is ${balance}`
    res.send(response)
  }*/ else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})