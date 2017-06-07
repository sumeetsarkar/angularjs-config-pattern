# AngularJS Config Pattern

> Demo project to showcase config JSON driven bootstraping of angular modules

The idea is to have all the angular modules, commonly controller, service, factory, directive, constant and its respective dependencies all declare in one single JSON and then bootstrapping Angular app reading the JSON.

### Analogy
This pattern allows us to group all modules with dependencies into one single config JSON making it easier to maintain, kind of like node package.json 

### Benefits
1. Modules can be grouped for common dependencies.
2. Any specific dependency of a module can be just declared as a incremental diff.
3. Avoids all the dependencies scattered around in the project.
4. Modules additions can be controlled programmatically while bootstrapping.

Surely all this can be done with conventional way of declaring Angular modules, but it would not be as manageable, leading to messy and spread across code.

Also, it kind of makes all modules appear as regular javascript functions and hence appears less intimidating for newbies learning Angular.

### Sample usage
[Config declaration & bootstrapping](app/index.js)

### Install dependencies
    npm install

### Build dist
    npm run build

### Starting the example
    npm run start
