"""configurations.py
Allows different deployment modes for prod/dev/test etc.
"""

class BaseConfig(object):
    '''
    Base config class
    '''
    DEBUG = True
    TESTING = False
class ProductionConfig(BaseConfig):
    """
    Production specific config
    Subclasses the base class
    """
    DEBUG = False
class DevelopmentConfig(BaseConfig):
    """
    Development environment specific configuration
    """
    DEBUG = True
    TESTING = True