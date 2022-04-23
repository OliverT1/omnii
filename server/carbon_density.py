"""carbon_density.py
Functions for pulling carbon density data given a verra project ID.
"""

import io
import requests

import tifffile as tiff

import rasterio
from rasterio.plot import show

import matplotlib.pyplot as plt

VERRA_PROJECT_URL = "https://registry.verra.org/uiapi/resource/resourceSummary/"
DCLIMATE_URL = "https://api.dclimate.net/apiv3/ceda-biomass"
DCLIMATE_HEADERS = {"Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNjUwNzI3MDgxLCJzdWIiOiI4YjQ5ZmU5Ny05YTM1LTRkODMtYTg0Yi03ZGZmMDIyYjcyNmMifQ.6kQrdGqTzW8WO85iIxwnAaqSsUBe4IZ1EMCU6ceLD3Q"}

def get_verra_data(project_id):
    """
    Returns the location of a verra project given its ID
    Params:
    - project_id (int): The ID of the project
    Returns:
    - location (json): The location of the project (latitude, longitude)
    """
    
    response = requests.get(VERRA_PROJECT_URL + str(project_id))
    verra_data = response.json()

    return verra_data


def read_image_from_url(url):
    resHead = requests.head(url)
    size = resHead.headers.get('content-length', -1)
    # size in megabytes (f-string, Python 3 only)
    print(f"{'FILE SIZE':<40}: {int(size) / float(1 << 20):.2f} MB")

    # resGet = requests.get(url, headers=DCLIMATE_HEADERS, stream=True)
    # print(resGet)
    path = "example1.tif"

    r = requests.get(url, headers=DCLIMATE_HEADERS, stream=True)
    if r.status_code == 200:
        with open(path, 'wb') as f:
            for chunk in r:
                f.write(chunk)
    # resp = requests.get(url)
    # Check that request succeeded
    return rasterio.open("example1.tif")


def get_satellite_data(verra_data):
    """Gets the biomass at a location and time from satellite imagery
    """
    location = verra_data["location"]

    lat_c = location["latitude"]
    lon_c = location["longitude"]

    # get the top left corner of the bounding box (rounded to nearest 10 degrees)
    lat_tl = round((lat_c + 5)/10)*10
    lon_tl = round((lon_c - 5)/10)*10
    
    print("lat tl", lat_tl, "long tl", lon_tl)

    biomass = {}    # biomass for different times

    # for year in [2010, 2017, 2018]:
    for year in [2010]:
        print(f"{DCLIMATE_URL}/{year}/{lat_tl}_{lon_tl}/AGB")
        # dataset = read_image_from_url(f"{DCLIMATE_URL}/{year}/{lat_tl}_{lon_tl}/AGB") 
        dataset = rasterio.open("example1.tif")
        print(dataset.count, dataset.height, dataset.width, dataset.crs, dataset.bounds)
        print(dataset.indexes)
        print(dataset.transform * (0, 0), dataset.transform * (dataset.width, dataset.height))
        print(dataset.read(1))
        # show(dataset)



def calculate_carbon_density(verra_data, satellite_data):

    project_size = 0
    for i in verra_data["participationSummaries"][0]["attributes"]:
        if i["code"] == "EST_ANNUAL_EMISSION_REDCT":
            project_size = int(i["values"]["value"])


def carbon_density(project_id):
    """
    Returns the carbon density of a verra project given its ID
    Params:
    - project_id (int): The ID of the project
    - time (datetime): The time of the carbon density
    Returns:
    - carbon (float): The carbon density of the project
    """
    carbon = 0
    
    location = get_verra_data(project_id)
    satellite_data = get_satellite_data(location)
    return carbon


if __name__ == "__main__":
    # print(carbon_density(3018, "2010-01-01"))

    # fp = 'example.tif'
    # dataset = rasterio.open(fp)
    # No. of Bands and Image resolution
    # print(dataset.count, dataset.height, dataset.width, dataset.crs, dataset.bounds)
    # Coordinate Reference System
    
    # show(img)
    verra_data = get_verra_data(3018)
    get_satellite_data(verra_data)
