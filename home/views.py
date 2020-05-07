from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from .models import LongitudeLatitude, House, Underground
from .common import set_page, user_login_valid
from django.db.models import Count, Q, F, Sum
from django.contrib.auth import authenticate,login as Authlogin,logout as Authlogout
from  django.contrib.auth.models import User


# 用户登录
def login(request):
    if request.method == "POST":
        data = request.POST
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            response = HttpResponseRedirect("/")
            # 保存登录信息到cookie和session中
            u = User.objects.get(username=username)
            request.session["username"] = username
            request.session["id"] = u.id
            request.session["email"] = u.email
            response.set_cookie("username",username)
            Authlogin(request,user)
            print(request.session.get("username"))
            return response
    return render(request,"common/login.html")


# 退出系统，清除登录信息
def logout(request):
    response = HttpResponseRedirect('/login')
    try:
        del request.session['username']  # 删除session
        response.delete_cookie('username')  # 删除cookie
        Authlogout(request)
    except:
        pass
    return response


# 首页
@user_login_valid
def index(request):
    path = "index"
    l = LongitudeLatitude.objects.values("longitude").annotate(Count("latitude"))
    return render(request,"common/index.html", {"path":path,"l":l})


# 经纬度信息
@user_login_valid
def longitudelatitude(request):
    path = "longitudelatitude"
    page = request.GET.get("page", 0)
    longitudelatitude_list = LongitudeLatitude.objects.all()
    data, page_list = set_page(longitudelatitude_list,20,page)
    return render(request, "common/longitudeLatitude.html", {"data":data, "page_list":page_list, "path":path})


# 删除经纬度信息
@user_login_valid
def delete_longitudelatitude(request, id):
    LongitudeLatitude.objects.filter(id=id).delete()
    return HttpResponseRedirect("/longitudelatitude")


# 经纬度信息详情
@user_login_valid
def longitudelatitude_detail(request, id):
    l = LongitudeLatitude.objects.filter(id=id)
    if l .exists():
        l = l[0]
        path = l.longitude+"/"+l.latitude + "详情"
        return render(request, "common/longitudelatitude_detail.html", {"path": path,"l":l})
    return render(request,"common/error-404.html")


# ajax获取房屋数据信息
def get_longitudelatitude_house_detail(request,id):
    result = {
        "data1":{"type":[], "count":[]},
        "data2":{"data":[],"value":[]}
    }
    h_list = House.objects.filter(longitudelatitude=id).values("type").annotate(Count("type"))
    for h in h_list:
        result["data1"]["type"].append(h["type"])
        result["data1"]["count"].append(h["type__count"])
        result["data2"]["data"].append(h["type"])
        result["data2"]["value"].append({"name":h["type"],"value":h["type__count"]})
    print(result)
    return JsonResponse(result)

# ajax 获取地下数据信息
def get_longitudelatitude_under_detail(request,id):
    result = {
        "data1":{"type":[], "count":[0,0,0]},
    }
    u_list = Underground.objects.filter(longitudelatitude=id)
    result["data1"]["type"]=["管道长度", "塌陷高度", "地下建筑高度"]
    for u in u_list:
        result["data1"]["count"][0]+=u.conduit
        result["data1"]["count"][1]+=u.collapse_height
        result["data1"]["count"][2]+=u.underground_height
    # print(result)
    return JsonResponse(result)


# 房屋信息
@user_login_valid
def house_message(request):
    path = "house"
    page = request.GET.get("page", 0)
    house_list = House.objects.all().order_by("-id")
    data, page_list = set_page(house_list, 20, page)
    return render(request, "common/house.html", {"data": data, "page_list": page_list, "path": path})


# 删除房屋信息
@user_login_valid
def delete_house_message(request, id):
    House.objects.filter(id=id).delete()
    return HttpResponseRedirect("/house")


# 添加房屋信息
@user_login_valid
def add_house_message(request):
    l_lst = LongitudeLatitude.objects.all()
    if request.method == "POST":
        data = request.POST
        housename = data.get("housename")
        type = data.get("type")
        height = data.get("height")
        area = data.get("area")
        longitudelatitude = data.get("longitudelatitude")
        House.objects.create(
            housename=housename,
            type=type,
            area=area,
            height=height,
            longitudelatitude_id=longitudelatitude,
        )
        return HttpResponseRedirect("/house")
    path = "add_house_message"
    return render(request,"common/add_house_message.html",{"path":path,"l_lst":l_lst})


# 更新房屋信息
@user_login_valid
def update_house_message(request, id):
    if request.method == "POST":
        data = request.POST
        id = data.get("id")
        housename = data.get("housename")
        type = data.get("type")
        height = data.get("height")
        area = data.get("area")
        longitudelatitude = data.get("longitudelatitude")
        House.objects.filter(id=id).update(
            housename=housename,
            type=type,
            area=area,
            height=height,
            longitudelatitude_id=longitudelatitude,
        )
        return HttpResponseRedirect("/house")

    h = House.objects.filter(id=id)
    if h.exists():
        path = "update_house_message"
        l_lst = LongitudeLatitude.objects.all()
        return render(request, "common/update_house_message.html", {"h": h[0], "l_lst": l_lst, "path": path})
    else:
        return render(request, "common/error-404.html")

# index ajax获取房屋数量信息
def get_house_number(request):
    house_list = House.objects.values("type").annotate(Count("housename"))
    result = {"type_list":[], "count":[]}
    print(house_list)
    for house in house_list:
        result["type_list"].append(house.get("type"))
        result["count"].append(house.get("housename__count"))
    print(result)
    return JsonResponse(result)


# 地下数据信息
@user_login_valid
def underground_message(request):
    path = "underground"
    # underground = ""
    longitudelatitude = request.GET.get("longitudelatitude","")
    if longitudelatitude:
        l_list = LongitudeLatitude.objects.filter(Q(longitude__contains=longitudelatitude) or Q(latitude__contains=longitudelatitude)).values_list("id",flat=True)
        under_list = Underground.objects.filter(longitudelatitude__in=l_list)
    else:
        under_list = Underground.objects.all()
    page = request.GET.get("page", 0)
    data, page_list = set_page(under_list, 20, page)
    return render(request, "common/underground_message.html", {"data": data, "page_list": page_list, "path": path,"longitudelatitude":longitudelatitude})


# 添加地下数据
@user_login_valid
def add_underground_message(request):
    path = "add_underground_message"
    if request.method == "POST":
        data = request.POST
        conduit=data.get("conduit")
        collapse_height=data.get("collapse_height")
        underground_height=data.get("underground_height")
        longitudelatitude=data.get("longitudelatitude")
        Underground.objects.create(
            conduit=conduit,
            collapse_height=collapse_height,
            underground_height=underground_height,
            longitudelatitude_id=longitudelatitude,
        )
        return HttpResponseRedirect("/underground_message")
    return render(request,"common/add_underground_message.html",{"path":path})


# 更新地下信息
@user_login_valid
def update_underground_message(request, id):
    if request.method == "POST":
        data = request.POST
        id=data.get("id")
        conduit=data.get("conduit")
        collapse_height=data.get("collapse_height")
        underground_height=data.get("underground_height")
        longitudelatitude=data.get("longitudelatitude")
        Underground.objects.filter(id=id).update(
            conduit=conduit,
            collapse_height=collapse_height,
            underground_height=underground_height,
            longitudelatitude_id=longitudelatitude,
        )
        return HttpResponseRedirect("/underground_message")

    u = Underground.objects.filter(id=id)
    if u.exists():
        path = "update_underground_message"
        l_lst = LongitudeLatitude.objects.all()
        u=u[0]
        return render(request,"common/update_underground_message.html",{"u":u, "l_lst":l_lst, "path":path})
    else:
        return render(request,"common/error-404.html")


# 删除地下数据信
@user_login_valid
def delete_underground_message(request, id):
    Underground.objects.filter(id=id).delete()
    return HttpResponseRedirect("/underground_message")


# 地下数据详情
@user_login_valid
def unground_detail(request, id):
    u = Underground.objects.filter(id=id)
    if u.exists():
        u = u[0]
        # path = l.longitude+"/"+l.latitude + "详情"
        return render(request, "common/underground_detail.html", {"u":u})
    return render(request,"common/error-404.html")

# ajax获取地下数据详情
def get_underground_detail(request,id):
    u = Underground.objects.filter(id=id)
    result = {
     "data": [], "value": [],
    }
    if u.exists():
        u = u[0]
        result["data"] = ["管道长度", "塌陷高度", "地下建筑高度"]
        result["value"].append({"name":"管道长度","value":u.conduit})
        result["value"].append({"name":"塌陷高度","value":u.collapse_height})
        result["value"].append({"name":"地下建筑高度","value":u.underground_height})
    return JsonResponse(result)



# show index message
def index_message(request):
    longitude = request.GET.get("longitude")
    result = {"data":[]}
    l_list = LongitudeLatitude.objects.filter(longitude=longitude).values_list("id",flat=True)

    total_conduit = Underground.objects.filter(longitudelatitude_id__in = l_list).values("longitudelatitude").annotate(Sum("conduit"),Sum("collapse_height"),Sum("underground_height"))

    if total_conduit.count()>50:
        total_conduit = total_conduit[50]
    print(total_conduit)
    for i in range(0,len(total_conduit)):
        z = total_conduit[i]
        l =LongitudeLatitude.objects.get(id=z["longitudelatitude"])
        name = l.longitude+l.latitude
        r = {"name":name,"value":z["collapse_height__sum"]+z["conduit__sum"]+z["underground_height__sum"]}
        result["data"].append(r)
    print(result)
    result["data"].sort(key=lambda i:i["value"],reverse=True)
    return JsonResponse(result)