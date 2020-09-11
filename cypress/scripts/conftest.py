import pytest
import boto3
from moto import mock_cognitoidp, mock_dynamodb2


@pytest.fixture
def cognito_mock():
    with mock_cognitoidp():
        client = boto3.client('cognito-idp', region_name='eu-west-1')

        user_pool_id = client.create_user_pool(PoolName='ewelists-unittest')["UserPool"]["Id"]

        client.admin_create_user(
            UserPoolId=user_pool_id,
            # Mock implementation does not work quite the same as real implementation.
            # In real implemenation can delete user with either sub or email.
            # Username=str(uuid.uuid4()),
            Username='test.exists@gmail.com',
            UserAttributes=[{"Name": "email", "Value": 'test.exists@gmail.com'}]
        )

        yield


@pytest.fixture
def dynamodb_mock():
    with mock_dynamodb2():
        dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')

        table = dynamodb.create_table(
            TableName='lists-unittest',
            KeySchema=[{'AttributeName': 'PK', 'KeyType': 'HASH'}, {'AttributeName': 'SK', 'KeyType': 'RANGE'}],
            AttributeDefinitions=[
                {'AttributeName': 'PK', 'AttributeType': 'S'},
                {'AttributeName': 'SK', 'AttributeType': 'S'},
                {'AttributeName': 'email', 'AttributeType': 'S'}
            ],
            ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5},
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'email-index',
                    'KeySchema': [{'AttributeName': 'email', 'KeyType': 'HASH'}, {'AttributeName': 'PK', 'KeyType': 'RANGE'}],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    }
                }
            ]
        )

        items = [
            {
                "PK": "USER#12345678-user-0001-1234-abcdefghijkl",
                "SK": "USER#12345678-user-0001-1234-abcdefghijkl",
                "email": "test.exists@gmail.com",
                "name": "Test User1",
                "userId": "12345678-user-0001-1234-abcdefghijkl"
            }
        ]

        for item in items:
            table.put_item(TableName='lists-unittest', Item=item)

        yield
