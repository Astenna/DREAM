import pytest

from constants.endpoints import PRODUCTION_DATA, URL
from constants.labels import FIELD_IS_REQUIRED_WARNING
from helpers.general import wait_for_view_change
import test_log_in as tli
from models.ProductionData import ProductionData
from scenarios.log_out import log_out
from scenarios.manage_production_data import open_production_data_view, open_add_production_data_form, submit_form, \
    fill_in_production_data_form, select_existing_production_data, delete_data, get_latest_production_data, \
    get_invalid_date_alert, get_invalid_amount_alert, get_invalid_type_alert, open_edit_production_data_form, \
    select_all_production_data, PRODUCTION_DATA_DELETED, seed_production_data


@pytest.fixture(autouse=True, scope='module')
def setup_module(driver):
    tli.test_log_in_farmer(driver)
    yield
    driver.get(URL)
    log_out(driver)


@pytest.fixture(autouse=True, scope='function')
def open_dashboard(driver):
    driver.get(URL)
    yield


def test_open_production_data_view(driver):
    open_production_data_view(driver)

    wait_for_view_change(driver, PRODUCTION_DATA)
    assert driver.current_url == PRODUCTION_DATA


def test_add_production_data(driver):
    test_open_production_data_view(driver)
    production_data = ProductionData()

    open_add_production_data_form(driver)
    fill_in_production_data_form(driver, production_data)

    submit_form(driver)

    latest = get_latest_production_data(driver)
    assert latest == production_data


def test_add_production_data_no_data_with_error(driver):
    test_open_production_data_view(driver)
    production_data = ProductionData(p_type='', amount='', date='')

    open_add_production_data_form(driver)
    fill_in_production_data_form(driver, production_data)

    submit_form(driver)

    assert get_invalid_type_alert(driver).text == FIELD_IS_REQUIRED_WARNING
    assert get_invalid_amount_alert(driver).text == FIELD_IS_REQUIRED_WARNING
    assert get_invalid_date_alert(driver).text == FIELD_IS_REQUIRED_WARNING


def test_delete_production_data(driver):
    test_add_production_data(driver)

    select_existing_production_data(driver)
    notification = delete_data(driver)
    assert notification.text == PRODUCTION_DATA_DELETED


def test_edit_production_data(driver):
    test_add_production_data(driver)

    new_production_data = ProductionData(p_type='Rice', date='2022-01-01')

    open_edit_production_data_form(driver)
    fill_in_production_data_form(driver, new_production_data, edit=True)

    submit_form(driver)

    latest = get_latest_production_data(driver)
    assert latest == new_production_data


def test_delete_all_production_data(driver):
    test_open_production_data_view(driver)
    production_data = [ProductionData(date=date)
                       for date in ['2022-01-01', '2022-01-02', '2022-01-03']]

    seed_production_data(driver, production_data)

    select_all_production_data(driver)
    notification = delete_data(driver)
    assert notification.text == PRODUCTION_DATA_DELETED
