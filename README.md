# Loc Hoang webpage

# This is also Full Stack Web Application Development Exercise 2020-2021

Webpage: [https://loc-hoang-webpage.web.app/](https://loc-hoang-webpage.web.app/)

Target of this project is building a personal website that has some pages for example my CV - use for job interview and personal blog that can post articles, in addition practice new technologies like Machine Learning in browser side, Firebsae function, some games such as Sudoku. The project support CI/CD based on Firebase and Github actions.

Technologies:

- For frontend: React
- For backend:
  - Firebase handle backend and user rights
  - Firebase should store image and other data
- Machine Learning: train and create model in Google Colab using Tensflow, in React side using Tensflow JS.
- Using Material-UI
- Git Commit: use [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- CI/CD: Firebase and Github actions.

Features:

- Theme:

  - Support light and dark theme
  - In initial loading, select theme base on user preference (browser), then user can set it in topbar. It is stored in local storage.

- User feature and rights:

  - SignUp as default role `viewer`, possible set other roles via Firebase
  - As guest only can view `CV` and play `Sudoku`
  - User logged in can view same as guest, plus `Blog`
  - `Owner` role has view same as user logged in, in addition `Create Blog`, `Machine Learning Videos`
  - In `User Info` (click on top right avatar, drop down menu): user can update avatar and password, upload avatar is supported and store in Firebase Storage
  - Logout by clicking on top right avatar, then drop down menu

- CV page:

  - Only `owner` can create, update, edit, delete, and add paragraph
  - Support rich text editor
  - Stored in FirebaseStore
  - Everyone can see

- Blog and Comments:

  - Only `owner` can see `Create Blog` and compose
  - Support rich text editor for blog and comment composing
  - Support upload image to Fire Storage, then return URL and display
  - User can view, comment on blog, in addtion like, dislike blog and other comments.
  - User can edit/delete their comments
  - Comments are stored in FireStore with blogID field that indicate which blog the comment belong
  - `Owner` has all rights same as user, in addtion can edit blog.

- Machine Learning Videos Player:

  - The main purpose is for study and practice apply Machine Learning. Therefore, this will be limited, only `owner` can view, and only upload few of eposides to the page (will remove soon)
  - Use Larva cartoon season 1 as video data (105 eposides). Trained and valid with first 75 eposides, the rest is for testing.
  - ML model will predict the time that real content should start (skip intro)
  - ML model is embedded and will be loaded, then start prediction when select a specific video. After prediction it will return the second, then skip button is available.

- Sudoku:

  - Make sudoku game with has timer, hint, resume and pause function
  - Main purpose is practice Javascript logical and display (CSS/Material UI)

- Notification:

  - Use Firebase function to implement
  - It will automatically create new notification when there is new user or new blog.
  - Notifications are store in FirebaseStore

- CI/CD:
  - Use github actions
  - Creates a new preview channel (and its associated preview URL) for every PR when comment `/preview` in PR
  - Then add a comment to the PR with the preview URL so that can view and test the PR's changes in a "preview" version of the app.
  - Updates the preview URL with changes from each commit by automatically deploying to the associated preview channel. The URL doesn't change with each new commit.
  - When merging to `master branch`, automatically deploy to Live channel and create Release version.
  - Release with description based on Convetional Commits, the bot will create a PR with `chore`, and we can edit or approve and merge it.

Time record: [TIME RECORD](TIMERECORD.md)
