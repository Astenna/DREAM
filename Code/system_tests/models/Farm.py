class Farm:
    def __init__(self,
                 sensor_system_id,
                 water_irrigation_system_id,
                 address_line1,
                 address_line2,
                 city,
                 postal_code,
                 mandal):
        self.sensor_system_id = sensor_system_id
        self.water_irrigation_system_id = water_irrigation_system_id
        self.address_line1 = address_line1
        self.address_line2 = address_line2
        self.city = city
        self.postal_code = postal_code
        self.mandal = mandal
