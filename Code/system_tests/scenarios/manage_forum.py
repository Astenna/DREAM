from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from constants.timeout import TIMEOUT
from helpers.general import wait_and_fill_in_fields


def click_on_forum_button(driver):
    my_help_requests_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/aside/div/ul/li[5]'
    )
    my_help_requests_button.click()


def open_forum_view(driver):
    click_on_forum_button(driver)


def click_on_create_forum_thread_button(driver):
    my_help_requests_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div/div[2]/button'
    )
    my_help_requests_button.click()


def open_create_forum_thread_form(driver):
    click_on_create_forum_thread_button(driver)


def fill_in_create_forum_thread_form(driver, forum_thread):
    wait_and_fill_in_fields(driver, {
        'topic': forum_thread.topic,
        'description': forum_thread.description
    })


def submit_form(driver):
    submit_button = driver.find_element(
        By.XPATH,
        '(.//*[normalize-space(text()) and normalize-space(.)="Cancel"])[1]/following::button[1]'
    )
    submit_button.click()


def get_invalid_topic_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="Create forum thread"])[2]/following::div[7]'
        ))
    )


def get_invalid_description_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '(.//*[normalize-space(text()) and normalize-space(.)="This field is required"])[1]/following::div[6]'
        ))
    )


def open_forum_thread(driver):
    my_help_request = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/a/div/div/div'
    )
    my_help_request.click()


def fill_in_comment(driver, advice):
    wait_and_fill_in_fields(driver, {
        'provideAdvice_message': advice,
    })


def submit_comment(driver):
    submit_response_button = driver.find_element(
        By.XPATH,
        '//div[@id="provideAdvice_submit"]/button/span'
    )
    submit_response_button.click()


def get_invalid_advice_alert(driver):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.visibility_of_element_located((
            By.XPATH,
            '//form[@id="provideAdvice"]/div/div/div[2]/div'
        ))
    )


def verify_latest_comment(driver, comment):
    return WebDriverWait(driver, TIMEOUT).until(
        EC.text_to_be_present_in_element((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[5]/div/div/div[2]/div/p'
        ), comment)
    )


def delete_forum_comment(driver):
    delete_icon = WebDriverWait(driver, TIMEOUT).until(
        EC.element_to_be_clickable((
            By.XPATH,
            '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[5]/div/div/div/div/span[5]/button/span'
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
