## Pokemon Rock-Paper-Scissors Battle

### Technology Used:
* Node.js
* Express.js
* Google Firebase
* jQuery
* Bootstrap

### Project Description:
2-Player Rock-Paper-Scissors: Choose a Pokemon to battle your opponent with! Once you have selected a Pokemon, you will be taken into a waiting room until your opponent has selected their Pokemon. Once selected, you will head to the battle arena to battle each other! To win, you must select a Pokemon type that is super effective to the opponent's. Good luck!

### How to Play:
![How to Play](./readmeAssets/example.gif)

#### Front End
* Landing page layout
    * List View
        * Display title, preview text, author, votes(up and down), category
        * Get Method to grab all posts
* Navbar
    * Logo
    * Add new post button on top
    * Dropdown of all categories
        * Get method for all categories
* Template Pages
    * Author Creation
        * Create a text field and submit button for author
    * Category Creation
        * Create a text field and submit button for category
* Post Creation
    * Text field for text
    * Author dropdown
    * Category dropdown
    * Submit button for text
* Post
    * Display title, full text, author, votes(up and down), category
    * Text field and button for submitting comments
#### Back End
* Server
* Firebase
    * Post Table
    * Comment Table
    * Author Table
    * Category Table

### How To Check Out Branches and Push Code
1. Navigate to our Project Board and find your issue #
2. Go back to terminal and run a 'git checkout -b PostIt-issueNumGoesHere-quick-description'
    * Example: 'git checkout -b PostIt-19-update-readme'
    * ![checkoutBranch](./readmeAssets/1.png)
3. Make your changes
4. When you're ready to commit follow these steps:
    1. Run 'git add .' to add all your changes
    2. Run 'git commit -m "#issueNumber with description of what you did afterwards"'
        * This step is important, if you dont add your issue number then github won't recognize the commit and display the commit message on github
    3. Push your changes 'git push origin branchName'
    * ![pushBranch](./readmeAssets/2.png)
5. If you have any questions or are skeptical about something, ask Jonathan :D
