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