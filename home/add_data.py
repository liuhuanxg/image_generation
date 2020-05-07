#-*-coding:utf-8 -*-
"""
@File: add_data.py
@作用：这个文件用来模拟数据
"""


from .models import LongitudeLatitude, House, Underground
from django.http import HttpResponse
import random

# 添加经纬度信息

def add_LongitudeLatitude(request):
    for j in range(2):
        if j==0:
            for i in range(180):
                for z in range(1,10):
                    LongitudeLatitude.objects.create(
                        longitude="东经{}".format(i),
                        latitude="南纬{}".format(z)
                    )
                    LongitudeLatitude.objects.create(
                        longitude="东经{}".format(i),
                        latitude="北纬{}".format(z)
                    )
        if j == 1:
            for i in range(180):
                for z in range(1, 10):
                    LongitudeLatitude.objects.create(
                        longitude="西经{}".format(i),
                        latitude="南纬{}".format(z)
                    )
                    LongitudeLatitude.objects.create(
                        longitude="西经{}".format(i),
                        latitude="北纬{}".format(z)
                    )
    return HttpResponse("经纬度添加成功")



# 添加房屋信息
def add_house(request):
    lst = LongitudeLatitude.objects.values_list("id", flat=True)
    house_list = ["别墅", "平房", "瓦房", "窑洞", "楼房"]
    for i in range(1,100000):
        house_name = random.choice(house_list)
        House.objects.create(
            housename=house_name+str(i),
            type=house_name,
            height=random.randint(10,50),
            area=random.randint(100,1000),
            longitudelatitude_id = random.choice(lst),
        )
    return HttpResponse("房屋添加成功！")



# 地下数据信息
def add_underground(request):
    lst = LongitudeLatitude.objects.values_list("id", flat=True)
    for i in range(100000):
        Underground.objects.create(
            conduit = random.randint(10,100),
            collapse_height = random.randint(0,10),
            underground_height = random.randint(0,10),
            longitudelatitude_id = random.choice(lst)
        )
    return HttpResponse("地下信息添加成功！")