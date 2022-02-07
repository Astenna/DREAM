from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from constants.timeout import TIMEOUT
from helpers.general import wait_and_fill_in_fields


def click_on_my_help_requests_button(driver):
    my_help_requests_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/aside/div/ul/li[4]/span'
    )
    my_help_requests_button.click()


def open_my_help_requests_view(driver):
    click_on_my_help_requests_button(driver)


def click_on_create_help_request_button(driver):
    my_help_requests_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div/div[2]/button'
    )
    my_help_requests_button.click()


def open_create_help_request_form(driver):
    click_on_create_help_request_button(driver)


def fill_in_create_help_request_form(driver, help_request):
    wait_and_fill_in_fields(driver, {
        'topic': help_request.topic,
        'description': help_request.description
    })


def submit_form(driver):
    submit_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::span[1]'
    )
    submit_button.click()


def get_invalid_topic_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="Create help request"])[2]/following::div[7]'
        ))
    )


def get_invalid_description_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="This field is required"])[1]/following::div[6]'
        ))
    )


def open_my_help_request(driver):
    my_help_request = WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/a/div/div/div/div/h1'
        ))
    )
    my_help_request.click()


def open_provide_help_view(driver):
    provide_help_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/aside/div/ul/li[5]/span'
    )
    provide_help_button.click()


def open_help_request(driver):
    help_request = WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/a/div/div/div/div/h1'
        ))
    )
    help_request.click()


def fill_in_response(driver, advice):
    wait_and_fill_in_fields(driver, {
        'provideAdvice_message': advice,
    })


def submit_response(driver):
    submit_response_button = driver.find_element(
        By.XPATH,
        '//button[@type="submit"]'
    )
    submit_response_button.click()


def verify_latest_response(driver, advice):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.text_to_be_present_in_element((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[4]/div/div[3]/div/div/div[2]/div/p'
        ), advice)
    )


def delete_help_request(driver):
    delete_icon = WebDriverWait(driver, TIMEOUT).until(
        EC.element_to_be_clickable((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="Help request: My carrots are yellow"])[1]/following::*[name()="svg"][1]'
        ))
    )
    delete_icon.click()

    confirm_option = WebDriverWait(driver, TIMEOUT).until(
        EC.element_to_be_clickable((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::button[1]'
        ))
    )
    confirm_option.click()


def delete_help_response(driver):
    delete_icon = WebDriverWait(driver, TIMEOUT).until(
        EC.element_to_be_clickable((
            By.CSS_SELECTOR,
            'span.anticon.anticon-delete > svg'
        ))
    )
    delete_icon.click()

    confirm_option = WebDriverWait(driver, TIMEOUT).until(
        EC.element_to_be_clickable((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="No"])[1]/following::span[1]'
        ))
    )
    confirm_option.click()
