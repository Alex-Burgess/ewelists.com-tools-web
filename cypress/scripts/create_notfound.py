import argparse
import sys
import common
import uuid


def main(lists_table, notfound_table, list_id, user_id, profile=None):
    product_id = create_product(notfound_table, user_id, profile)

    add_to_list(lists_table, list_id, product_id, profile)

    print(product_id)
    return True


def create_product(table, user_id, profile=None):
    dynamodb = common.dynamodb_session(profile)

    product_id = str(uuid.uuid4())

    item = {
        "productId": {'S': product_id},
        "brand": {'S': "John Lewis"},
        "details": {'S': "Baby Cardigan"},
        "productUrl": {'S': "https://www.johnlewis.com/john-lewis-partners-baby-cardigan/pink/p4875232"},
        "createdBy": {'S': user_id}
    }

    try:
        dynamodb.put_item(TableName=table, Item=item)
    except Exception as e:
        print('ERROR: Unexpected error when creating product in table.',
              'error = ' + str(e),
              'table = ' + table,
              'productId = ' + product_id,
              sep="\n  "
              )
        sys.exit(1)

    return product_id


def add_to_list(table, list_id, product_id, profile=None):
    dynamodb = common.dynamodb_session(profile)

    item = {
        "PK": {'S': 'LIST#' + list_id},
        "SK": {'S': 'PRODUCT#' + product_id},
        "type": {'S': 'notfound'},
        "purchased": {'N': '0'},
        "quantity": {'N': '1'},
        "reserved": {'N': '0'}
    }

    try:
        dynamodb.put_item(TableName=table, Item=item)
    except Exception as e:
        print('ERROR: Unexpected error when adding product in table.',
              'error = ' + str(e),
              'table = ' + table,
              'productId = ' + product_id,
              sep="\n  "
              )
        sys.exit(1)

    return True


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Create product in products table.')
    parser.add_argument('-L', '--lists_table', help='lists table name', required=True)
    parser.add_argument('-N', '--notfound_table', help='notfound table name', required=True)
    parser.add_argument('-u', '--user', help='user ID', required=True)
    parser.add_argument('-l', '--list', help='list ID', required=True)
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    args = parser.parse_args()
    main(args.lists_table, args.notfound_table, args.list, args.user, args.profile)
