from flask import Flask, request

import configurations
from carbon_density import get_carbon_density

app = Flask(__name__)
print('ready')

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/carbon_density/<int:project_id>")
def carbon_density(project_id):
    """
    Returns the carbon data of a verra project given its ID
    Params:
    - project_id (int): The ID of the project
    - time (datetime): The time of the carbon density
    Returns:
    - carbon_data (dict): The carbon density of the project
        - baselineBiomass5Year (float): The baseline biomass of the project
        - satelliteDelta1Year (float): The change in biomass of the project over 1 year
        - projectedDelta1Year (float): The projected change in biomass of the project over 1 year
    """
    carbon_data = get_carbon_density(project_id)

    return carbon_data


if __name__ == '__main__':

    app.config.from_object('configurations.DevelopmentConfig')
    # app.config.from_object('configurations.ProductionConfig')
    app.run()