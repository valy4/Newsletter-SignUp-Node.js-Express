


const express = require(`express`)
const bodyParser = require(`body-parser`)
const request = require(`request`)

const app = express()
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

app.get("/", function (request, response) {
  response.sendFile(__dirname, "/signup.html")
})


app.post("/", function (req, res) {
  var firstName = req.body.fName
  var secondName = req.body.lName
  var email = req.body.email
  console.log(firstName)
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName,


      }

    }]
  };
  var jsonData = JSON.stringify(data)
  const url = "https://us6.api.mailchimp.com/3.0/lists/8800485fd1"
  const options = {
    method: "POST",
    auth: "valy4:b0be3613219eb502b5507ab37dbe6ceb - us6"
  }
  const requesT = https.request(url, options, function (response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname, "/success.html")
    } else {
      res.sendFile(__dirname, "/failure.html")
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data))
    })

  })
  requesT.write(jsonData)
  requesT.end()
})

app.listen(3000, function () {
  console.log("server is running on port 3000")
})
// 654db9fb049eeb5328bda2442a4acdd6 - us6
// b0be3613219eb502b5507ab37dbe6ceb - us6
// 8800485fd1