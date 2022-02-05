class ProductionData:
    def __init__(self,
                 p_type='Milk',
                 amount='1',
                 date='2022-02-01'
                 ):
        self.type = p_type
        self.amount = amount
        self.date = date

    def __eq__(self, other):
        if not isinstance(other, ProductionData):
            return NotImplemented

        return self.type == other.type and self.amount == other.amount and self.date == other.date
