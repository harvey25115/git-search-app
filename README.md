# GitHub Search Repository App

This project is bootstrapped with create-react-app (typescript).
I made the design as responsive (desktop, mobile, tablet) using vanilla CSS.
I attempted to use CSS module to avoid style clashes. But since this project is small and the design is simple, I am contented to use just vanilla CSS.

For the data fetching, I decided to use SWR to have a caching and revalidation features.
And decided to use reducer to manage complex state.

For pagination, I did not use any plugins/tools. The design was to display maximum of 40 results per page and 5 pages per screen. I also consider the rate limit of Github API usage (1000 results).

For the throttle feature, since the page and search function calls the API. I have applied throttling considering also the rate limit of Github API of 10 requests per minute.

For the folder structure I decided to organize the project by components, page, hooks and interfaces.

I have executed E2E testing to for the following functionalities:

- Search
- Pagination
- Throttle

Tech Used:

- React
- Typescript
- SWR
- Cypress (E2E testing)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run cypress:run`

First run the local server using `npm start` then run the E2E testing headlessly.
Note: Video capturing is disabled.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
