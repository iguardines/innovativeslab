var loggly = require('loggly');

function logger(tag) {
 return loggly.createClient({
    token: "20dba058-c66e-4767-ba90-3b058afe4b81",
    subdomain: "simonegonzalez",
    tags: ["NodeJS"],
    json:true
});
}
module.exports = logger;