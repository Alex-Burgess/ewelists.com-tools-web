# ewelists.com-tools-web

React Web Application relating to the [Tools](https://github.com/Alex-Burgess/ewelists.com-tools) application.

## Useful links
- [Serverless Stack](https://serverless-stack.com)
- [React Web Template](https://www.creative-tim.com/product/material-dashboard-react)

## Available Scripts

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`
Builds the app for a local/test environment to the `build` folder.

### `REACT_APP_STAGE=staging npm run build`
Builds the application for staging environment.


## Copy Content
After building the application you can copy the content to S3:
```
aws s3 sync build/ s3://test.tools.ewelists.com --delete
zzz
