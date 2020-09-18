import pytest
import create_notfound


class TestCreateNotfound:
    def test_create_product(self, dynamodb_mock, capsys):
        assert create_notfound.main('lists-unittest', 'notfound-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl')
        captured = capsys.readouterr()
        assert len(captured.out.strip('\n')) == 36

    def test_create_product_fails(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            create_notfound.main('lists-unittest', 'notfound-wrong', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl')

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_add_to_list_fails(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            create_notfound.main('lists-wrong', 'notfound-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestCreateProduct:
    def test_create_successful(self, dynamodb_mock):
        product_id = create_notfound.create_product('notfound-unittest', '12345678-user-0001-1234-abcdefghijkl')
        assert len(product_id) == 36

    def test_create_errors(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            create_notfound.create_product('notfound-wrong', '12345678-user-0001-1234-abcdefghijkl')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestAddToList:
    def test_add_to_list(self, dynamodb_mock):
        assert create_notfound.add_to_list('lists-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl')

    def test_add_error(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            create_notfound.add_to_list('wrong-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl')

        assert e.type == SystemExit
        assert e.value.code == 1
