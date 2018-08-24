# Sports

**Version Used **
Angular CLI: 6.0.8
Node: 8.11.3
OS: win32 x64
Angular: 6.1.4

#Step 1:

After creating the new project using ng new "project name" follow the below steps

#Step 1:
**Dependency to be installed **
npm install
npm install rxjs-compat --save
npm install bootstrap@3.3.7
npm install jquery jquery-ui-dist

#Step 2: Add following things in angular.json

            "styles": [
              "src/styles.scss",
              "./node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
            "scripts": [
              "./node_modules/jquery/dist/jquery.js",
              "./node_modules/bootstrap/dist/js/bootstrap.js",
              "./node_modules/jquery-ui-dist/jquery-ui.js"
            ]

#Step 3: ng serve [Note : local use - End url's in dataservice are taken from src\environments\environment.ts]

export const environment = {
  production: false,
  loginPageURL: "./assets/data/api/json/loginData.json",
  getPlayerPageURL: "https://sports-6a9db.firebaseio.com/circketdata.json"
};

#Step 4: End point url for login is taken from localJson file which is stored in src\assets\data\api\json\loginData.json

For admin {
	"username" : "ramesh",
	"password" : "ramesh123",
	"role" : "admin",
    "token"    : "fake-jwt-token"
}	

For normal user you can change role to user, After changing logout and login to reflect the changes

For user {
	"username" : "ramesh",
	"password" : "ramesh123",
	"role" : "user",
    "token"    : "fake-jwt-token"
}		
			