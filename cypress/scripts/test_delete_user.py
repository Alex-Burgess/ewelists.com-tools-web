import pytest
import boto3
import delete_user


@pytest.fixture
def user_pool_id():
    client = boto3.client('cognito-idp', region_name='eu-west-1')
    list_response = client.list_user_pools(MaxResults=1)
    id = list_response['UserPools'][0]['Id']
    return id


class TestDeleteUser:
    def test_delete_user(self, cognito_mock, user_pool_id):
        assert delete_user.main('test.exists@gmail.com', user_pool_id)

    def test_delete_fails_in_cognito(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            delete_user.main('dummy@gmail.com', user_pool_id)

        assert e.type == SystemExit
        assert e.value.code == 1


class TestDeleteFromCognito:
    def test_delete_successul(self, cognito_mock, user_pool_id):
        assert delete_user.delete_from_cognito('test.exists@gmail.com', user_pool_id)

    def test_delete_fails(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            delete_user.delete_from_cognito('dummy@gmail.com', user_pool_id)

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_delete_errors(self, cognito_mock):
        with pytest.raises(SystemExit) as e:
            delete_user.delete_from_cognito('dummy@gmail.com', 'eu-west-1_12345678')

        assert e.type == SystemExit
        assert e.value.code == 1
