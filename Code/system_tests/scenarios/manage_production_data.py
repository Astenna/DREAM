from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from constants.timeout import TIMEOUT
from helpers.general import wait_and_fill_in_fields


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
    edit_production_data_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td[5]/button/span'
    )

    edit_production_data_button.click()


def open_edit_production_data_form(driver):
    click_on_edit_production_data_button(driver)


def fill_in_production_data_form(driver, production_data):
    wait_and_fill_in_fields(driver, {
        'addProductionData_type': production_data.type,
        'addProductionData_amount': production_data.amount,
        'addProductionData_date': production_data.date
    })


def click_on_delete_production_data_button(driver):
    delete_production_data_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td/label/span/input'
    )
    delete_production_data_button.click()


def delete_data(driver):
    click_on_delete_production_data_button(driver)


def select_existing_production_data(driver):
    production_data_box = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td/label/span/input'
    )
    production_data_box.click()

    WebDriverWait(driver, TIMEOUT).until(
        EC.element_located_to_be_selected((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[2]/div/div/div/div/div/div/div/table/tbody/tr[2]/td/label/span/input'
        ))
    )


def submit_form(driver):
    submit_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::span[1]'
    )
    submit_button.click()

    #     TODO: Uncomment after notification is implemented
    # return wait_for_pop_up_to_appear(driver)
