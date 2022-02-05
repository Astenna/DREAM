from selenium.webdriver.common.by import By

from helpers.general import wait_and_fill_in_fields, wait_for_pop_up_to_appear

SUCCESS = 'Account deleted successfully.'


def click_on_delete_account_button(driver):
    delete_account_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div/div/button/span'
    )
    delete_account_button.click()


def click_on_submit_button(driver):
    submit_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::span[1]'
    )
    submit_button.click()


def open_delete_account_form(driver):
    click_on_delete_account_button(driver)


def fill_in_delete_account_form(driver, policy_maker):
    wait_and_fill_in_fields(driver, {
        'email': policy_maker.email,
        'password': policy_maker.password,
    })


def delete_account(driver):
    click_on_submit_button(driver)

    return wait_for_pop_up_to_appear(driver)
