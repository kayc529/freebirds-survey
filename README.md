## Starting the project

After you clone the project to your computer, run `npm install` to ensure all packages are installed before you start the project.

  

## Branches

The **main** branch consists of production codes, which means *it should only contain codes that 100% work*. Please ensure your codes are well tested before merging codes into the **main** branch.

### Create a new branch *locally*
`git branch <new-branch-name>`

### Switching to another branch
`git checkout <branch-name>`
*You cannot switch branch unless all the modifications are committed. If you want to force switch branch, use `git checkout <branch-name> -f`*

### Pulling codes from remote
Before pushing your codes, make sure your branch contains the most updated codes from the **main** branch. You can do this by `git pull main` to merge the codes from remote main into your current local branch.
### Pushing codes to Github (remote)
1. Add all modifications to stage `git add .`
2. Commit with message `git commit -m '<your message>'`
3. Push codes to repo `git push origin -u <branch-name>`
*Please note that you MUST NOT push codes to the **main** branch. Pull request must be created if you want to merge your branch into the **main** branch*



## Pull Request

### Creating Pull Request
Before merging your codes into the **main** branch, you must create a pull request to let other team members look at your codes.

It is the best to mention what changes are made in your codes when you create a pull request.