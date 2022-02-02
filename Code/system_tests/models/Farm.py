class Farm:
    id_iter = 1

    def __init__(self,
                 sensor_system_id=id_iter,
                 water_irrigation_system_id=id_iter,
                 address_line1='JWHP',
                 address_line2=f'+{id_iter}XP',
                 city='Kataram',
                 postal_code='505503',
                 mandal='Kataram',
                 idx=None
                 ):
        self.sensor_system_id = sensor_system_id
        self.water_irrigation_system_id = water_irrigation_system_id
        self.address_line1 = address_line1
        self.address_line2 = address_line2
        self.city = city
        self.postal_code = postal_code
        self.mandal = mandal

        if idx is not None:
            self.sensor_system_id = idx
            self.water_irrigation_system_id = idx
            self.address_line2 = f'+{idx}XP'
