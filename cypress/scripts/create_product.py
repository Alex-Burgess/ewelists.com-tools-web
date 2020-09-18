import argparse
import sys
import common
import uuid


def main(table, profile=None):
    product_id = create_in_table(table, profile)

    print(product_id)
    return True


def create_in_table(table, profile=None):
    dynamodb = common.dynamodb_session(profile)

    product_id = str(uuid.uuid4())

    item = {
        "productId": {'S': product_id},
        "brand": {'S': "John Lewis & Partners"},
        "retailer": {'S': "johnlewis.com"},
        "price": {'S': "20.00"},
        "priceCheckedDate": {'S': "2020-08-27 16:00:00"},
        "details": {'S': "Baby Cardigan, Pink"},
        "productUrl": {'S': "https://www.johnlewis.com/john-lewis-partners-baby-cardigan/pink/p4875232"},
        "imageUrl": {'S': "https://johnlewis.scene7.com/is/image/JohnLewis/004329586?$rsp-pdp-port-640$"}
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


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Create product in products table.')
    parser.add_argument('-t', '--table', help='table name', required=True)
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    args = parser.parse_args()
    main(args.table, args.profile)
