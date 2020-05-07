from django.db import models


# 经纬度信息
class LongitudeLatitude(models.Model):
    class Meta:
        verbose_name = "经纬度"
        verbose_name_plural = "经纬度"

    longitude = models.CharField(max_length=10,verbose_name="经度")
    latitude = models.CharField(max_length=10,verbose_name="纬度")

    def __str__(self):
        return self.longitude+"/"+self.latitude


# 建筑物信息
class House(models.Model):
    class Meta:
        verbose_name = "建筑信息"
        verbose_name_plural = "建筑信息"

    housename = models.CharField(max_length=30, verbose_name="房屋名称")
    type = models.CharField(max_length=30,verbose_name="建筑物类型")
    height = models.IntegerField(verbose_name="高度")
    area = models.IntegerField(verbose_name="面积")
    longitudelatitude = models.ForeignKey("LongitudeLatitude",on_delete=models.CASCADE,verbose_name="经纬度")

# 地下数据
class Underground(models.Model):
    class Meta:
        verbose_name = "地下数据"
        verbose_name_plural = "地下数据"

    conduit = models.IntegerField("管道长度")
    collapse_height = models.IntegerField("塌陷高度")
    underground_height = models.IntegerField("地下建筑高度")
    longitudelatitude = models.ForeignKey("LongitudeLatitude", on_delete=models.CASCADE)

