import argparse
import sys
import common


def main(email, user_pool_id, profile=None):
    delete_from_cognito(email, user_pool_id, profile)

    print("Deleted user: " + email)
    return True


def delete_from_cognito(email, user_pool_id, profile=None):
    cognito = common.cognito_session(profile)

    try:
        cognito.admin_delete_user(
            UserPoolId=user_pool_id,
            Username=email
        )
    except Exception as e:
        print('ERROR: User could not be deleted from cognito userpool.',
              'error = ' + str(e),
              'userpool = ' + user_pool_id,
              'email = ' + email,
              sep="\n  "
              )
        sys.exit(1)

    return True


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Delete test user in cognito.')
    parser.add_argument('-e', '--email', help='users email', required=True)
    parser.add_argument('-U', '--user_pool', help='userpool id', required=True)
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    args = parser.parse_args()
    main(args.email, args.user_pool, args.profile)
