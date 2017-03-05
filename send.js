// ------------------
// Create a campaign\
// ------------------

// Include the SendinBlue library\
require("./mailin2.js");

// Instantiate the client\
var client = new Mailin("https://api.sendinblue.com/v2.0","FdXpkH5Svtxy1b8j");

// Define the campaign settings\
data = { "name":"Campaign sent via the API",
    "subject":"My subject",
    "from_name":"From name",
    "from_email":"roy@traffix771.com",

// Content that will be sent\
"html_content":"Congratulations ! You successfully sent this example campaign via the SendinBlue API.",

// Select the recipients\
"listid": [2],

// Schedule the sending in one hour\
};

// Make the call to the client\
client.create_campaign(data).on('complete', function(data) {
    console.log(data);
});
