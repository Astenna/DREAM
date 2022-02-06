from selenium.webdriver.common.by import By


def get_summary_component(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div/div/div/div/div/div/h1'
    )


def get_tips_and_suggestions_component(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div/div/div/div[2]/div/div/h1'
    )


def get_recent_production_data_component(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div/div/div[3]/div/div/div/h1'
    )


def get_my_help_requests_component(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div/div/div[3]/div[2]/div/div/h1'
    )


def get_farmers_with_positive_note(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div/div/div/div/div/div/div'
    )


def get_farmers_with_negative_note(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div/div/div[2]/div/div/div/div'
    )
