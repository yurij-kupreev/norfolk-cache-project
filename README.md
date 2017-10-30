# Introduction 
*Norfolk Cache* is a simple key-value storage application designed for Azure Mentoring program.

# Getting Started
The project structure:
* (NorfolkCache)[NorfolkCache] - an ASP.NET MVC application that runs on .NET Framework version 4.6.1.
* (ApiTests)[ApiTests] - a set of API tests that are built using chakram/mocha.
* (LoadTests)[LoadTests] - a set of load tests and initial data. 

Branches:
* *development* - an unstable development branch.
* *master* - a stable production-ready branch.
* *release* - a stable release branch.

Workflow:
* Developers work on a feature using it's own feature branch. When the feature is completed a responsible developer merges the feature branch to *development* branch.
* All features that are deployed and verified on CI environment are merged to master branch using a special schedule.
* All features that are deployed to CI environment are merged to the release branch according to a release schedule.  

Fork this repository to create your own copy that you will use in this program. 

# Build and Test
Open ASP.NET MVC solution file (NorfolkCache)[NorfolkCache\NorfolkCache.sln] with Visual Studio 2015 or Visual Studion 2017.

# Practical Task "Web Apps"
The goal of this task is to create a set of App Services for three different environments:

	* *my-norfolk-cache-ci* - a unstable CI environment with the latest version of **development** branch.

	* *my-norfolk-cache-uat* - a stable UAT environment with the latest version of **master** branch.

	* *my-norfolk-cache* - a stable production environment with the latest version of **release** branch.

Please, use your own prefix name instead of *my* to avoid name conflicts.

## Step 1
1. Create a new resource group "my-norfolk-cache".
2. 

Questions:

1. What is a resource group location?
