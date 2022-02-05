from datetime import datetime
from re import sub

from selenium.webdriver import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from constants.timeout import TIMEOUT
from helpers.general import wait_and_fill_in_fields, wait_for_pop_up_to_appear
from models.ProductionData import ProductionData

PRODUCTION_DATA_DELETED = 'Production data deleted.'


def click_on_production_data_button(driver):
    production_data_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/aside/div/ul/li[3]/span'
    )
    production_data_button.click()


def open_production_data_view(driver):
    click_on_production_data_button(driver)


def click_on_add_production_data_button(driver):
    add_production_data_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div/div/div/div/button'
    )
    add_production_data_button.click()


def open_add_production_data_form(driver):
    click_on_add_production_data_button(driver)


def click_on_edit_production_data_button(driver):
    edit_production_data_button = WebDriverWait(driver, TIMEOUT).until(
        EC.element_to_be_clickable((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td[5]/button/span'
        )))

    edit_production_data_button.click()


def open_edit_production_data_form(driver):
    click_on_edit_production_data_button(driver)


def fill_in_production_data_form(driver, production_data, edit=False):
    wait_and_fill_in_fields(driver, {
        'addProductionData_productionType': production_data.type,
        'addProductionData_amount': production_data.amount,
        'addProductionData_date': production_data.date + Keys.ENTER
    }, edit)


def click_on_delete_production_data_button(driver):
    delete_production_data_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Production data"])[2]/following::*[name()="svg"][2]'
    )
    delete_production_data_button.click()


def delete_data(driver):
    click_on_delete_production_data_button(driver)

    return wait_for_pop_up_to_appear(driver)


def select_existing_production_data(driver):
    production_data_box = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td/label/span/input'
    )
    production_data_box.click()

    WebDriverWait(driver, TIMEOUT).until(
        EC.element_located_to_be_selected((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td/label/span/input',
        ))
    )


def select_all_production_data(driver):
    checkbox = driver.find_element(
        By.XPATH,
        '//input[@value=""]'
    )
    checkbox.click()


def submit_form(driver):
    submit_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::span[1]'
    )
    submit_button.click()


def get_invalid_type_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//form[@id="addProductionData"]/div[2]/div[2]/div[2]/div'
        ))
    )


def get_invalid_amount_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//form[@id="addProductionData"]/div[3]/div[2]/div[2]/div'
        ))
    )


def get_invalid_date_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//form[@id="addProductionData"]/div[4]/div[2]/div[2]/div'
        ))
    )


def get_latest_production_data(driver):
    latest_production_data_type = WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td[2]'
        ))
    )

    latest_production_data_amount = WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td[3]'
        ))
    )

    latest_production_data_date = WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td[4]'
        ))
    )

    return ProductionData(
        p_type=latest_production_data_type.text,
        amount=sub(r'\s|kg', '', latest_production_data_amount.text),
        date=datetime.strptime(latest_production_data_date.text, '%d/%m/%Y').strftime('%Y-%d-%m')
    )


def seed_production_data(driver, production_data):
    for element in production_data:
        open_add_production_data_form(driver)
        fill_in_production_data_form(driver, element)

        submit_form(driver)
