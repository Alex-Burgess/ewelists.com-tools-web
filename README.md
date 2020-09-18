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

### `npx cypress open`
Open cypress testing console.

### `npx cypress run --tag "local"`
Run cypress tests against local environment.

### `npx cypress run --config-file cypress.staging.json --tag "staging"`
Run cypress tests with a different environment.

### `CYPRESS_TEST_TAGS=smoke npx cypress run`
Run just smoke tests.

### `CYPRESS_TEST_TAGS=regression npx cypress run`
Run just regression tests

## Copy Content
After building the application you can copy the content to S3:
```
aws s3 sync build/ s3://test.tools.ewelists.com --delete
```

## UI Testing
To run the Cypress tests locally an IAM user with API key is required.

1. Create IAM user in console, e.g. *CypressTestUser*
1. Create cognito policy and attach to iam user:
    ```
    {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": "cognito-idp:*",
              "Resource": [
                  "arn:aws:cognito-idp:eu-west-1:<account_id>:userpool/<test_userpool_id>",
                  "arn:aws:cognito-idp:eu-west-1:<account_id>:userpool/<staging_userpool_id>"
              ]
          }
      ]
    }
    ```
1. Create tables policy and attach to iam user:
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor1",
                "Effect": "Allow",
                "Action": "dynamodb:*",
                "Resource": [
                    "arn:aws:dynamodb:eu-west-1:<account_id>:table/lists-test",
                    "arn:aws:dynamodb:eu-west-1:<account_id>:table/lists-staging",
                    "arn:aws:dynamodb:eu-west-1:<account_id>:table/products-test",
                    "arn:aws:dynamodb:eu-west-1:<account_id>:table/products-staging",
                    "arn:aws:dynamodb:eu-west-1:<account_id>:table/notfound-test",
                    "arn:aws:dynamodb:eu-west-1:<account_id>:table/notfound-staging"
                ]
            }
        ]
    }
    ```
1. Create access key and setup local profile and credentials
