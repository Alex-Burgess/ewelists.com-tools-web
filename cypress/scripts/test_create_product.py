import pytest
import create_product


class TestCreateProduct:
    def test_create_product(self, dynamodb_mock, capsys):
        assert create_product.main('products-unittest')
        captured = capsys.readouterr()
        assert len(captured.out.strip('\n')) == 36

    def test_create_product_fails(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            create_product.main('products-wrong')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestCreateFromTable:
    def test_create_successful(self, dynamodb_mock):
        product_id = create_product.create_in_table('products-unittest')
        assert len(product_id) == 36

    def test_create_errors(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            create_product.create_in_table('products-wrong')

        assert e.type == SystemExit
        assert e.value.code == 1
