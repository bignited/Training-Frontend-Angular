import { defineConfig } from "cypress";
 
 export default defineConfig({
   env: {
     API_URL: "https://puloxsv4yvgh63rvdgp3ltduxa0lhxxl.lambda-url.eu-west-1.on.aws",
   },
 
   e2e: {
    baseUrl:"http://training-frontend-angular.s3-website-eu-west-1.amazonaws.com",
     setupNodeEvents(on, config) {
        
     },
   },
 });