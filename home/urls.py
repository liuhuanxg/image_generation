#-*-coding:utf-8 -*-
"""
@project:image_generation
@File: urls.py
"""


from django.urls import path
from .views import *
# 路由

# 通过url调用views.py
urlpatterns = [
    path('', index, name="index"),
    path('index/', index, name="index"),

    # 登录退出功能
    path('login/', login, name="login"),
    path('logout/', logout, name="logout"),

    # 经纬度信息操作
    path('longitudelatitude/', longitudelatitude, name="longitudelatitude"),
    path('delete_longitudelatitude/<int:id>', delete_longitudelatitude, name="delete_longitudelatitude"),
    path('longitudelatitude_detail/<int:id>', longitudelatitude_detail, name="longitudelatitude_detail"),
    path('get_longitudelatitude_house_detail/<int:id>', get_longitudelatitude_house_detail, name="get_longitudelatitude_house_detail"),
    path('get_longitudelatitude_under_detail/<int:id>', get_longitudelatitude_under_detail, name="get_longitudelatitude_under_detail"),

    # 房屋信息操作
    path('house_message/', house_message, name="house_message"),
    path('add_house_message/', add_house_message, name="add_house_message"),
    path('delete_house_message/<int:id>', delete_house_message, name="delete_house_message"),
    path('update_house_message/<int:id>', update_house_message, name="update_house_message"),

    # index html获取房屋数量
    path('get_house_number/', get_house_number, name="get_house_number"),
    path('index_message/', index_message, name="index_message"),

    # 地下数据操作
    path('underground_message/', underground_message, name="underground_message"),
    path('update_underground_message/<int:id>', update_underground_message, name="update_underground_message"),
    path('delete_underground_message/<int:id>', delete_underground_message, name="delete_underground_message"),
    path('add_underground_message/', add_underground_message, name="add_underground_message"),
    path('unground_detail/<int:id>', unground_detail, name="unground_detail"),
    path('get_underground_detail/<int:id>', get_underground_detail, name="get_underground_detail"),
]

from .add_data import *
# 以下代码为添加数据使用
urlpatterns += [
    # path('add_LongitudeLatitude/', add_LongitudeLatitude, name="add_LongitudeLatitude"),
    # path('add_house/', add_house, name="add_house"),
    # path('add_underground/', add_underground, name="add_underground"),
]

app_name = "home"