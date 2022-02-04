from selenium.webdriver.common.by import By


def click_on_user_name_button(driver):
    user_name_button = driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/header/ul/li/span/div'
    )
    user_name_button.click()


def open_summary(driver):
    click_on_user_name_button(driver)


def get_soil_humidity_component(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[5]/div/h1'
    )


def get_water_usage_component(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/div[5]/div[2]/h1'
    )


def get_weather_forecast_component(driver):
    return driver.find_element(
        By.XPATH,
        '//div[@id="root"]/div/section/section/main/div/div[3]/div/h1[3]'
    )
