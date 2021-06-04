# nomadcoffee-backend
인스타클론 6주 챌린지

1 : BACKEND SETUP (Prisma) From #3.0 to #3.12

2 : (05-26) From #4.0 to #4.2
    Nomad Coffee will be an app where developers can go and find the best caffes to work from in 한국!!
    On your schema.prisma let's create the User model, the model must have the following fields:
    id
    username
    email
    name
    location
    password
    avatarURL
    githubUsername
    After you are done, make a createAccount resolver.
    createAccount should:
    Create a user
    Hash the password
    Check that the username / email aren't taken
    Return ok:true or ok:false, error:$error if there is an error.

3 : (05-27) From #4.3 to #4.19
    Now it's time to create the following resolvers:
    editProfile: Change the user's profile, this includes changing password and changing the avatarURL.
    login: Log the user in by returning a JWT or return an error in case the password is wrong.
    seeProfile: See any users profile.
    
    You will also have to write some code to protect your resolvers and inject the logged in user to the resolver's context.

4 : (05-31) From #4.20 to #4.29
    Implement Follow / Unfollow functionality.
    Implement followers & following computed fields with pagination on the seeUser resolver (No extra resolvers).
    Implement searchUsers resolver.

5 : (06-02) From #6.0 to #6.10

    Task One: Models
    Create a Category model with a relationshops to CoffeeShop
    Create a CoffeeShop model with a relationship to the User that created the CoffeeShop and relationships to Category
    Create a CoffeeShopPhoto model with a relationship to the CoffeeShop
    The new models will also have other fields, here is how the graphql schema should look like (you need to also add them on prisma)

    Task Two: Resolvers
    Create the following resolvers: createCoffeeShop,seeCoffeeShops,seeCoffeeShop,seeCategory,seeCategories,editCoffeeShop

    createCoffeeShop should create a CoffeeShop, it should create a Category if it does not exist (the same way we created Hashtags on #6.4 and should upload and create a CoffeeShopPhoto for each uploaded file.
    seeCoffeeShops should list all the CoffeeShop with pagination.
    seeCoffeeShop should get a CoffeeShop by id.
    seeCategory should list all the CoffeeShop inside of a Category with pagination.
    seeCategories should list all the Category and should have a totalShops computed field that counts all the CoffeeShop inside of the Category, it should also have pagination
    editCoffeeShop should edit a CoffeeShop

6 : (06-03) From #19.0 to #19.7

    Today's solution is from taeyoungs! The functions in src/coffeeShop/coffeeShop.utiles.ts are great!

    Tasks
    We are finished with the backend! Following the lectures of the section #19 deploy your backend to Heroku. You will also have to configure a PostgreSQL Database.

    Make sure you select only the free versions of Database and Servers


done
https://nomadcoffee-backend-byoungju.herokuapp.com/graphql
