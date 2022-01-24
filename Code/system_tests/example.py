import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType


@pytest.fixture(scope='class')
def setup(request):
    options = Options()

    for option in ['--headless',
                   '--disable-gpu',
                   '--ignore-certificate-errors',
                   '--disable-extensions',
                   '--no-sandbox',
                   '--disable-dev-shm-usage']:
        options.add_argument(option)

    chrome_driver = webdriver.Chrome(service=Service(ChromeDriverManager(
        chrome_type=ChromeType.CHROMIUM).install()), options=options)

    request.cls.driver = chrome_driver
    yield

    chrome_driver.close()


@pytest.mark.usefixtures('setup')
class BasicTest:
    pass


class TestURL(BasicTest):
    def test_open_url(self):
        print(f'Here: {self.driver}')
        print(self.driver)
        self.driver.get('https://www.google.com/')
        print(self.driver.title)
