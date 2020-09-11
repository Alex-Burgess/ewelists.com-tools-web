import boto3


def cognito_session(profile):
    if profile:
        session = boto3.session.Session(profile_name=profile)
        cognito = session.client('cognito-idp')
        return cognito

    cognito = boto3.client('cognito-idp')
    return cognito
