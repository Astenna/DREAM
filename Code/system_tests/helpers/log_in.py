from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from constants.paths import URL
from constants.timeout import TIMEOUT
from helpers.general import wait_and_fill_in_fields

INVALID_EMAIL = 'Provided email has incorrect format'
INVALID_PASSWORD = 'This field is required'


def open_log_in_dialog(driver):
    driver.get(URL)

    element = WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//div[@id="root"]/div/section/header/div/div[2]/ul/li/span'
        ))
    )
    element.click()


def fill_in_email_and_password(driver, email, password):
    wait_and_fill_in_fields(
        driver,
        {
            'email': email,
            'password': password
        }
    )


def log_in(driver):
    elements = driver.find_elements(By.TAG_NAME, 'button')

    elements[-1].click()


def get_invalid_email_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="Log in"])[2]/following::div[7]'
        ))
    )


def get_invalid_password_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="Provided email has incorrect format"])[1]/following::div[6]'
        ))
    )
