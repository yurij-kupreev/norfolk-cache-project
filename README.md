# Introduction 

*Norfolk Cache* is a simple key-value storage application designed for Azure Mentoring program. This guide contains a bunch of practical tasks that will help mentees successfully complete the program.

# Getting Started

Fork this repository to create your own copy that you will use in this program. 


## Project Structure

- [NorfolkCache](NorfolkCache) - an ASP.NET MVC application that runs on .NET Framework version 4.6.1.
- [ApiTests](ApiTests) - a set of API tests that are built using chakram/mocha.
- [LoadTests](LoadTests) - a set of load tests and initial data. 


## Environment Branches

- **development** - an unstable development branch for Continuous Integration environment.
- **master** - a stable production-ready branch for UAT environment.
- **release** - a stable release branch for Production environment.


## Development Workflow
- Developers work on a feature using it's own feature branch.
- When the feature is completed a responsible developer merges the feature branch to **development** branch.
- When the feature is tested and verified by QA on Continuous Integration environment the feature changes are merged to master branch.
- When the feature is tested and verified by the UAT acceptance group the feature changes are merged to the release branch.  


# Build and Test

Open ASP.NET MVC solution file [NorfolkCache](NorfolkCache\NorfolkCache.sln) with Visual Studio 2015 or Visual Studion 2017.


## Run API tests

```sh
$ cd ApiTests
$ npm install
$ rem Replace host in urlBase with relevant environment host in test\tests.js. 
$ notepad test\tests.js
$ npm tests
```


# 1. Practical Task "Web Apps"
The goal of this task is to create a set of App Services for three different environments:
- *my-norfolk-cache-ci* - a unstable CI environment with the latest version of **development** branch.
- *my-norfolk-cache-uat* - a stable UAT environment with the latest version of **master** branch.
- *my-norfolk-cache* - a stable production environment with the latest version of **release** branch.

Please, use your own prefix name instead of *my* to avoid name conflicts.


## Solution 1

1. Create a new resource group *my-norfolk-cache*. (["Azure Resource Manager"](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview).)

2. Create a new *my-norfolk-cache-ci* web app in *my-norfolk-cache* resource group with new app service plan *my-norfolk-cache-ci-plan* (free pricing tier, any location).

3. Create a new *my-norfolk-cache-uat* web app in *my-norfolk-cache* resource group with new app service plan *my-norfolk-cache-uat-plan* (free pricing tier, any location).

4. Create a new *my-norfolk-cache* web app in *my-norfolk-cache* resource group with new app service plan *my-norfolk-cache-plan* (free pricing tier, any location).

5. Setup deployment for *my-norfolk-cache-ci* web app:
	* Open "Deployment slots" tab and learn information on this page.
	* Open "Deployment options" tab and add github deployment for **development** branch.

6. Gain more information about your *my-norfolk-cache-ci*:
	* Open "Overview" tab and open a web app url - http://my-norfolk-cache-ci.azurewebsites.net.
	* Learn about "Quotas" for this web app. (["Monitor Apps"](https://docs.microsoft.com/en-us/azure/app-service/web-sites-monitor).)
	* Run API tests for this host and learn how this affect quotas.

7. View diagnostics logs:
	* Open "Diagnostics logs" and enable filesystem application logging (Information level), web server logging, and detailed error messages. ([Learn about troubleshooting a web app in Azure](https://docs.microsoft.com/en-us/azure/app-service/web-sites-dotnet-troubleshoot-visual-studio).)
	* Open "Log stream" go to "Application logs" and run API tests. - bo results?
	* Open "Log stream", go to "Web server logs" and run API tests. (["Enable diagnostics logging"](https://docs.microsoft.com/en-us/azure/app-service/web-sites-enable-diagnostic-log).) - no results?

8. View detailed information about processes:
	* Open "Process explorer" and learn more about w3wp processes: PID, threads, working set, private memory, open handles, loaded modules.
	* Open Site Configuration Console (SCM) or Kudu for this web app - https://my-norfolk-cache-ci.scm.azurewebsites.net/. (["Accessing the Kudu Service"](https://github.com/projectkudu/kudu/wiki/Accessing-the-kudu-service).)
	* Use REST API to get information about all processes - https://my-norfolk-cache-ci.scm.azurewebsites.net/api/diagnostics/processes/.
	* Use REST API to get information about a specific process - https://my-norfolk-cache-ci.scm.azurewebsites.net/api/diagnostics/processes/process-id.

9. Restarting web app.
	* Run API tests, and open the web app url.
	* Restart the app, and open the web app url.
	* Run API tests, and open the web app url.
	* Kill IIS w3wp process, and open url.
	* Run API tests, and open the web app url.
	* Kill Kudu w3wp process and open web app url.

10. Using console:
	* Open "Console" and go to D:\home\site\wwwroot folder. Create a new "my-test" folder.
	* Open CMD Debug Console in an another browser tab and go to D:\home\site\wwwroot folder. Find "my-test" folder in the current folder.
	* Print web app configuration file:
```sh
$ type Web.config
```

11. Setup deployment for *my-norfolk-cache-uat* web app.
	* Use Github's **master** branch.
	* Enable application logging, Information level. Use filesystem as a storage.
	* Review web app quotas.
	* Run API tests for this environment.

12. Setup deployment for *my-norfolk-cache* web app.
	* Use Github's **release** branch.
	* Enable application logging, Error level. Use blob as a storage.
	* Review web app quotas.
	* Run API tests for this environment.


## Questions

1. What is a resource group location?
2. What plan do you need to have deployment slots for your web app?
3. How to access Kudu or SCM for a web app?