"""carbon_density.py
Functions for pulling carbon density data given a verra project ID.
"""

import io
import re
import requests

import rasterio
from rasterio.plot import show

import numpy as np
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
    # print(f"{'FILE SIZE':<40}: {int(size) / float(1 << 20):.2f} MB")

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
    print("location", location)

    lat_c = location["latitude"]
    lon_c = location["longitude"]

    # get the top left corner of the bounding box (rounded to nearest 10 degrees)
    lat_tl = round((lat_c + 5)/10)*10
    lon_tl = round((lon_c - 5)/10)*10
    
    print("lat tl", lat_tl, "long tl", lon_tl)

    biomass = {}    # biomass for different times

    for year in [2010, 2017, 2018]:
    # for year in [2010]:
        print(f"{DCLIMATE_URL}/{year}/{lat_tl}_{lon_tl}/AGB")
        dataset = read_image_from_url(f"{DCLIMATE_URL}/{year}/{lat_tl}_{lon_tl}/AGB") 
        # dataset = rasterio.open("example1.tif")
        # show(dataset)
        print(dataset.count, dataset.height, dataset.width, dataset.crs, dataset.bounds)
        print(dataset.read(1))
        row, col = dataset.index(lat_c, lon_c)
        print("centre point of matrix", row, col)
        print("bottom right", dataset.index(dataset.bounds.bottom, dataset.bounds.right))
        
        biomass[year] = calculate_carbon_density(verra_data, dataset)

        # show(dataset)
    print(biomass)

    baseline = np.mean([biomass[2010], biomass[2017]])
    print(f"Baseline: {baseline}")
    delta = biomass[2018] - baseline
    print("delta", delta)

    # if delta < 
    #     # mint no token

    # else:
    #     # mint yes token

    # # return delta 




def calculate_carbon_density(verra_data, satellite_data):

    est_annual_redct = 0
    size_in_sqkm = 0
    for i in verra_data["participationSummaries"][0]["attributes"]:
        if i["code"] == "EST_ANNUAL_EMISSION_REDCT":
            print(i)
            est_annual_redct = int(i["values"][0]["value"])

        if i["code"] == "PROJECT_ACREAGE":
            size_str = i["values"][0]["value"]
            # check if hectares or acres and convert to km
            if "Acres" in size_str:
                size_in_sqkm = int(''.join(c for c in size_str if c.isdigit())) / 247 
            elif "Hectares" in size_str:
                size_in_sqkm = int(''.join(c for c in size_str if c.isdigit())) * 0.01
            else:
                print("Could not find size of project")
                return 0
    print("est annual redct", est_annual_redct, "size in sq km", size_in_sqkm)
    length_of_square_km = np.sqrt(size_in_sqkm)
    print("box length", length_of_square_km)
    r = length_of_square_km / 2

    # central coords
    location = verra_data["location"]

    f = location["latitude"]
    l = location["longitude"]
    # print("f", f, "l", l)


    df = r/114        # North-south distance in degrees
    dl = df / np.cos(np.deg2rad(f))  # East-west distance in degrees
    min_lat = f - df
    max_lat = f + df
    min_lon = l - dl
    max_lon = l + dl
    # print("min lat", min_lat, "max lat", max_lat, "min lon", min_lon, "max lon", max_lon)

    band1 = satellite_data.read(1)
    # print(np.shape(band1))

    offset_row, offset_col = satellite_data.index(satellite_data.bounds.bottom, satellite_data.bounds.right)
    # print(offset_col, offset_row)

    max_row, max_col = satellite_data.index(max_lat, min_lon)
    min_row, min_col = satellite_data.index(min_lat, max_lon)
    # print(min_row, min_col, max_row, max_col)

    # apply the offset
    min_row -= offset_row
    max_row -= offset_row
    min_col -= offset_col
    max_col -= offset_col


    # print(min_row, min_col, max_row, max_col)
    show(band1[min_row:max_row, min_col:max_col])
    carbon_density_total = np.sum(band1[min_row:max_row, min_col:max_col])
    # print(carbon_density_total)

    return carbon_density_total



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
    
    verra_data = get_verra_data(project_id)
    satellite_data = get_satellite_data(location)
    calculate_carbon_density(verra_data, satellite_data)

    return carbon


if __name__ == "__main__":
    # print(carbon_density(3018, "2010-01-01"))

    # fp = 'example.tif'
    # dataset = rasterio.open(fp)
    # No. of Bands and Image resolution
    # print(dataset.count, dataset.height, dataset.width, dataset.crs, dataset.bounds)
    # Coordinate Reference System
    
    # show(img)
    verra_data = get_verra_data(1542)
    # verra id 1911
    # delta -585
    # baseline 366043
    # {2010: 378038, 2017: 354048, 2018: 365458}
    #     "location": {
    #     "latitude": 47.470000,
    #     "longitude": -121.840000
    # },
    # "value": "815 Acres"


    # 607
    #     "location": {
    #     "latitude": 49.288547,
    #     "longitude": -116.846603
    # },

    # 1542 on toucan
    # location {'latitude': 25.908866, 'longitude': 102.968453}
    #    est annual redct 54734 size in sq km 68.79
    # box length 8.293973715897586
    # {2010: 231486, 2017: 365191, 2018: 388331}
    # Baseline: 298338.5
    # delta 89992.5
    get_satellite_data(verra_data)
