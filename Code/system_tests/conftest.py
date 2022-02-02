import logging

import pytest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType


@pytest.fixture(scope='session')
def driver():
    options = Options()

    for option in [
        '--headless',
        '--disable-gpu',
        '--ignore-certificate-errors',
        '--disable-extensions',
        '--no-sandbox',
        '--disable-dev-shm-usage'
    ]:
        options.add_argument(option)

    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    chrome_driver = webdriver.Chrome(service=Service(ChromeDriverManager(
        chrome_type=ChromeType.CHROMIUM, log_level=logging.ERROR).install()), options=options)

    yield chrome_driver

    chrome_driver.close()
